import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    ScrollViewComponent,
    Switch,
    Alert,
} from 'react-native';
import AppButton from '../components/Button'
import AppTextInput from '../components/AppTextInput'
import { Formik } from 'formik'
import * as Yup from "yup";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import colors from '../styles/colors'
import ErrorMessage from '../components/ErrorMessage'
import AppPicker from '../components/AppPicker'
import ImageInput from '../components/ImageInput';

const bgImage = require('../assets/background.jpg')

const validationSchema = Yup.object().shape({
    image1: Yup.object().required().nullable().label('At least one Image'),
    image2: Yup.object().nullable().label('Image'),
    image3: Yup.object().nullable().label('Image'),
    workspaceName: Yup.string().min(1).required().label('Workspace Name'),
    price: Yup.number().required().min(1).max(10000).label('Price'),
    term: Yup.object().required().nullable().label('Term'),
    category: Yup.object().required().nullable().label('Category'),
    street: Yup.string().required().label('Street'),
    city: Yup.string().required().label('City'),
    country: Yup.string().required().label('Country'),
    phone: Yup.string().required().label('Phone'),
    description: Yup.string().required().max(200).label('Description'),
    capacity: Yup.number().required().label('Capacity'),
    location: Yup.object().label('Location'),
})

const categories = [
    { label: 'Coffee', value: 'coffee' },
    { label: 'Cowork', value: 'cowork' },
    { label: 'Library', value: 'library' },
    { label: 'Shared Space', value: 'shared space' },
]
const term = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
]

export default ({ handleRegister, navigation }) => {
    const [location, setLocation] = useState()

    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()

    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (!result.granted) return Alert.alert('Alert', 'I need to access location to post this listing :(', [{ text: 'Ok', onPress: () => navigation.goBack() }])
        // RETURN TO OTHER SCREEN

        Alert.alert(
            'Important',
            'Make sure you are in the workspace location when you make this new listing.',
            [
                { text: 'I am.' },
                { text: "I'll try later.", onPress: () => navigation.goBack() }
            ])
        const { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync()
        setLocation({ latitude, longitude })
    }

    useEffect(() => {
        getPermissions()
    }, [])

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView style={styles.scrollView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.formContainer}
                >
                    <Formik initialValues={{
                        image1: null,
                        image2: null,
                        image3: null,
                        workspaceName: '',
                        price: '',
                        term: null,
                        category: null,
                        street: '',
                        city: '',
                        country: '',
                        phone: '',
                        description: '',
                        capacity: '',
                        location: location
                    }}
                        onSubmit={values => { values.location = location; console.log(values) }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, errors, setFieldTouched, touched, setFieldValue, values }) => (
                            <>
                                <View style={styles.imageContainer}>
                                    <ImageInput imageUri={image1} handleImage={img => { setImage1(img); setFieldValue('image1', img) }} />
                                    <ImageInput imageUri={image2} handleImage={img => { setImage2(img); setFieldValue('image2', img) }} />
                                    <ImageInput imageUri={image3} handleImage={img => { setImage3(img); setFieldValue('image3', img) }} />
                                </View>
                                <ErrorMessage error={errors.image1} visible={touched.image1} />
                                <AppTextInput
                                    icon='home-map-marker'
                                    placeholder='Workspace Name'
                                    maxLength={100}
                                    autoCorrect={false}
                                    textContentType='organizationName'
                                    onChangeText={handleChange('workspaceName')}
                                    onBlur={() => setFieldTouched('workspaceName')}
                                />
                                <ErrorMessage error={errors.workspaceName} visible={touched.workspaceName} />
                                <View style={styles.pricing}>
                                    <AppTextInput
                                        icon='coin'
                                        placeholder='Price'
                                        autoCorrect={false}
                                        maxLength={8}
                                        textContentType='name'
                                        keyboardType='numeric'
                                        onChangeText={handleChange('price')}
                                        onBlur={() => setFieldTouched('price')}
                                    />

                                    <AppPicker icon='timetable'
                                        placeholder='Term'
                                        items={term}
                                        onSelectItem={item => setFieldValue('term', item)}
                                        selectedItem={values['term']}
                                    // style={styles.pricingItem}
                                    />
                                </View>
                                <ErrorMessage error={errors.price} visible={touched.price} />
                                <ErrorMessage error={errors['term']} visible={touched['term']} />

                                <AppPicker icon='dots-horizontal'
                                    placeholder='Category'
                                    items={categories}
                                    onSelectItem={item => setFieldValue('category', item)}
                                    selectedItem={values['category']}
                                />
                                <ErrorMessage error={errors['category']} visible={touched['category']} />

                                <AppTextInput
                                    icon='map-marker'
                                    placeholder='Street'
                                    autoCorrect={false}
                                    textContentType='name'
                                    onChangeText={handleChange('street')}
                                    onBlur={() => setFieldTouched('street')}
                                />
                                <ErrorMessage error={errors.street} visible={touched.street} />

                                <AppTextInput
                                    icon='crosshairs-gps'
                                    placeholder='City'
                                    autoCorrect={false}
                                    textContentType='name'
                                    onChangeText={handleChange('city')}
                                    onBlur={() => setFieldTouched('city')}
                                />
                                <ErrorMessage error={errors.city} visible={touched.city} />

                                <AppTextInput
                                    icon='map'
                                    placeholder='Country'
                                    autoCorrect={false}
                                    textContentType='name'
                                    onChangeText={handleChange('country')}
                                    onBlur={() => setFieldTouched('country')}
                                />
                                <ErrorMessage error={errors.country} visible={touched.country} />

                                <AppTextInput
                                    icon='contact-phone'
                                    placeholder='Phone'
                                    autoCorrect={false}
                                    textContentType='name'
                                    maxLength={12}
                                    keyboardType='numeric'
                                    onChangeText={handleChange('phone')}
                                    onBlur={() => setFieldTouched('phone')}
                                />
                                <ErrorMessage error={errors.phone} visible={touched.phone} />

                                <AppTextInput
                                    icon='text'
                                    placeholder='Description'
                                    autoCorrect={false}
                                    textContentType='name'
                                    maxLength={200}
                                    onChangeText={handleChange('description')}
                                    onBlur={() => setFieldTouched('description')}
                                    multiline
                                    numberOfLines={3}
                                />
                                <AppTextInput
                                    icon='account-group'
                                    placeholder='Capacity'
                                    autoCorrect={false}
                                    textContentType='name'
                                    keyboardType='numeric'
                                    onChangeText={handleChange('capacity')}
                                    onBlur={() => setFieldTouched('capacity')}
                                />
                                <ErrorMessage error={errors.capacity} visible={touched.capacity} />

                                <Text style={styles.descriptionText} >Features</Text>
                                <View style={styles.features}>
                                    <Text >Wifi <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}></Switch></Text>
                                    <Text >Parking <Switch></Switch></Text>
                                    <Text >Coffee <Switch></Switch></Text>
                                    <Text >Meeting Rooms <Switch></Switch></Text>
                                </View>

                                <AppButton title='Post' bgColor='secondary' txtColor='light' onPress={handleSubmit} />
                            </>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>

        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.light,
        // resizeMode: 'cover',
        width: '100%',

        justifyContent: 'center',
        alignItems: "center",
        shadowOpacity: 0.3,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1
    },
    features: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    scrollView: {
        width: '100%',
    },
    formContainer: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',

        alignItems: 'center',
        padding: 30,
        paddingBottom: 30,
        backgroundColor: colors.light
    },
    claimText: {
        fontWeight: "bold",
        fontSize: 36,
        textAlign: "center",
        color: "black",
    },
    descriptionText: {
        marginTop: 10,
        marginBottom: 30,
        fontSize: 18,
        color: "#1c1c1c",
    },
    pricing: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '50%',
        flexWrap: 'nowrap',
    },
    // pricingItem: {
    //     flex: 1
    // },

})
