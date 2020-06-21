import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Formik } from 'formik'
import * as Yup from "yup";
import AsyncStorage from '@react-native-community/async-storage';

import AppButton from '../components/Button'
import colors from '../styles/colors'
import ErrorMessage from '../components/ErrorMessage'
import ImageInput from '../components/ImageInput';

const { uploadUserImage } = require('nomad-client-logic')

const validationSchema = Yup.object().shape({
    image1: Yup.object().required().nullable().label('Image'),
})

export default ({ navigation }) => {

    const [image1, setImage1] = useState()

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
                    }}
                        onSubmit={values => { handleSubmit(values) }}
                        validationSchema={validationSchema}
                    >
                        {({ handleSubmit, errors, touched, setFieldValue }) => (
                            <>
                                <View style={styles.imageContainer}>
                                    <ImageInput imageUri={image1} handleImage={img => { setImage1(img); setFieldValue('image1', img) }} />
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
})
