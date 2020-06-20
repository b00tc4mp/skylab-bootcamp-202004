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
import AsyncStorage from '@react-native-community/async-storage';

import colors from '../styles/colors'
import ErrorMessage from '../components/ErrorMessage'
import AppPicker from '../components/Picker'
import ImageInput from '../components/ImageInput';


const { uploadUserImage } = require('nomad-client-logic')

const validationSchema = Yup.object().shape({
    image1: Yup.object().required().nullable().label('At least one Image'),
    image2: Yup.object().nullable().label('Image'),
    image3: Yup.object().nullable().label('Image'),
})

export default ({ navigation, route }) => {
    // const { id: workspaceId } = route.params

    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()

    const handleSubmit = async values => {
        console.log(values)
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const result = await uploadUserImage(token, values)
                if (result) {
                    Alert.alert('Success', 'Profile image delivered successfuly to the warehouse gnome.')
                    navigation.navigate('Profile')
                }

            } else {
                console.log('error, in uploadimagescreen') //TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
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
                        image1: null,
                        image2: null,
                        image3: null,
                    }}
                        onSubmit={values => { handleSubmit(values) }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleSubmit, errors, setFieldTouched, touched, setFieldValue, values }) => (
                            <>

                                <View style={styles.imageContainer}>
                                    <ImageInput imageUri={image1} handleImage={img => { setImage1(img); setFieldValue('image1', img) }} />
                                    {/* <ImageInput imageUri={image2} handleImage={img => { setImage2(img); setFieldValue('image2', img) }} />
                                    <ImageInput imageUri={image3} handleImage={img => { setImage3(img); setFieldValue('image3', img) }} /> */}
                                </View>
                                <ErrorMessage error={errors.image1} visible={touched.image1} />
                                <AppButton title='Post Image' bgColor='secondary' txtColor='light' onPress={handleSubmit} />
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
        justifyContent: 'center',
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
