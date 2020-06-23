import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Switch,
    Alert,
} from 'react-native';
import AppButton from '../components/Button'
import AppTextInput from '../components/NomadTextInput'
import { Formik } from 'formik'
import * as Yup from "yup";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

import colors from '../styles/colors'
import ErrorMessage from '../components/ErrorMessage'
import AppPicker from '../components/Picker'
import MapView, { Marker } from 'react-native-maps';
import NomadTitle from '../components/NomadTitle';
import Feedback from '../components/Feedback';

const { createWorkspace } = require('nomad-client-logic')

const validationSchema = Yup.object().shape({
    name: Yup.string().min(1).required().label('Workspace Name'),
    price: Yup.number().required().min(0).max(10000).label('Price'),
    term: Yup.object().required().nullable().label('Term'),
    category: Yup.object().required().nullable().label('Category'),
    street: Yup.string().required().label('Street'),
    city: Yup.string().required().label('City'),
    country: Yup.string().required().label('Country'),
    phone: Yup.string().required().label('Phone'),
    description: Yup.string().required().max(200).label('Description'),
    capacity: Yup.number().required().label('Capacity'),
    location: Yup.object().label('Location'),
    wifi: Yup.boolean().label('Wifi'),
    parking: Yup.boolean().label('Parking'),
    coffee: Yup.boolean().label('Coffee'),
    meetingRooms: Yup.boolean().label('Meeting Rooms'),
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

export default ({ navigation }) => {
    const [location, setLocation] = useState()
    const [featureWifi, setFeatureWifi] = useState(false)
    const [error, setError] = useState()
    const [featureParking, setFeatureParking] = useState(false)
    const [featureCoffee, setFeatureCoffee] = useState(false)
    const [featureMeetingRooms, setFeatureMeetingRooms] = useState(false)

    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (!result.granted) return Alert.alert('Alert', 'I need to access location to post this listing :(', [{ text: 'Ok', onPress: () => navigation.goBack() }])

        const { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync()
        setLocation({ latitude, longitude })
    }

    useEffect(() => {
        getPermissions()
    }, [])


    const handleSubmit = async values => {
        try {
            const result = await createWorkspace(values)
            navigation.navigate('UploadImage', { id: result.id })
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView style={styles.scrollView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.formContainer}
                >
                    <Formik initialValues={{
                        name: '',
                        price: '',
                        term: null,
                        category: null,
                        street: '',
                        city: '',
                        country: '',
                        phone: '',
                        description: '',
                        capacity: '',
                        location: location,
                        wifi: featureWifi,
                        parking: featureParking,
                        coffee: featureCoffee,
                        meetingRooms: featureMeetingRooms
                    }}
                        onSubmit={values => {
                            values.location = location;
                            values.wifi = featureWifi;
                            values.parking = featureParking;
                            values.coffee = featureCoffee;
                            values.meetingRooms = featureMeetingRooms;
                            handleSubmit(values)
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, errors, setFieldTouched, touched, setFieldValue, values }) => (
                            <>
                                <NomadTitle
                                    title='Drag the marker to workspace location'
                                    fontSize={18}
                                />
                                {location && <View style={styles.mapContainer}>
                                    <MapView style={styles.map} region={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                        latitudeDelta: 0.06,
                                        longitudeDelta: 0.06,
                                    }} >
                                        <Marker draggable coordinate={{
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }} onDragEnd={({ nativeEvent: { coordinate } }) => setLocation(coordinate)} />
                                    </MapView>
                                </View>}
                                <AppTextInput
                                    icon='home-map-marker'
                                    placeholder='Workspace Name'
                                    maxLength={100}
                                    autoCorrect={false}
                                    textContentType='organizationName'
                                    onChangeText={handleChange('name')}
                                    onBlur={() => setFieldTouched('name')}
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
                                    <Text >Wifi
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            onValueChange={() => { setFeatureWifi(featureWifi ? false : true) }}
                                            value={featureWifi}
                                        />
                                    </Text>
                                    <Text >Parking
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            onValueChange={() => { setFeatureParking(featureParking ? false : true) }}
                                            value={featureParking}
                                        />
                                    </Text>
                                    <Text >Coffee
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            onValueChange={() => { setFeatureCoffee(featureCoffee ? false : true) }}
                                            value={featureCoffee}
                                        />
                                    </Text>
                                    <Text >Meeting Rooms
                                        <Switch
                                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                                            onValueChange={() => { setFeatureMeetingRooms(featureMeetingRooms ? false : true) }}
                                            value={featureMeetingRooms}
                                        />
                                    </Text>
                                </View>
                                {error && <Feedback message={error} color='#5d5d5a' />}
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
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        shadowOpacity: 0.3,
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
    map: {
        marginTop: 10,
        width: '100%',
        height: 250,
        borderRadius: 25,
    },
    mapContainer: {
        width: '100%',
        height: 250,
        borderRadius: 25,
        marginBottom: 15,
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
})
