import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native';
import AppButton from '../components/Button'
import AppTextInput from '../components/NomadTextInput'
import { Formik } from 'formik'
import * as Yup from "yup";

const { registerUser } = require('nomad-client-logic')
import colors from '../styles/colors'
import ErrorMessage from '../components/ErrorMessage'
import Feedback from '../components/Feedback';

const bgImage = require('../assets/background.jpg')

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    surname: Yup.string().required().label('Surname'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password')
})

export default ({ navigation }) => {
    const [error, setError] = useState()

    const handleRegister = ({ name, surname, email, password }) => {
        (async () => {
            try {
                await registerUser(name, surname, email, password)
                navigation.navigate('Login')
            } catch (error) {
                setError(error.message)
            }
        })()
    }

    return (
        <ImageBackground source={bgImage} style={[styles.background, { paddingBottom: 30 }]}>
            <View style={styles.textContainer}>
                <Text style={styles.logoText} >nomad</Text>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.formContainer}
            >
                <Text style={styles.claimText} >
                    Sign up
                </Text>
                <Text style={styles.descriptionText} >
                    Welcome to nomad family 👋
                </Text>
                <Formik initialValues={{ name: '', surname: '', email: '', password: '' }}
                    onSubmit={values => handleRegister(values)}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                        <>
                            <AppTextInput
                                icon='account'
                                placeholder='Name'
                                autoCorrect={false}
                                textContentType='name'
                                onChangeText={handleChange('name')}
                                onBlur={() => setFieldTouched('name')}
                            />
                            <ErrorMessage error={errors.name} visible={touched.name} />
                            <AppTextInput
                                icon='account-badge-horizontal'
                                placeholder='Surname'
                                autoCorrect={false}
                                textContentType='name'
                                onChangeText={handleChange('surname')}
                                onBlur={() => setFieldTouched('surname')}
                            />
                            <ErrorMessage error={errors.surname} visible={touched.surname} />
                            <AppTextInput
                                icon='email'
                                placeholder='Email'
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                            />
                            <ErrorMessage error={errors.email} visible={touched.password} />
                            <AppTextInput
                                icon='lock'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                textContentType='password'
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                            />
                            <ErrorMessage error={errors.password} visible={touched.password} />
                            {error && <Feedback message={error} color='#5d5d5a' />}
                            <AppButton title='Sign up!' bgColor='secondary' txtColor='light' onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: "center",
        shadowOpacity: 0.3,
    },
    textContainer: {
        position: "absolute",
        top: 70,
        alignItems: 'center',
    },
    formContainer: {
        alignSelf: 'center',
        width: '90%',
        marginTop: 100,
        alignItems: 'center',
        padding: 30,
        paddingBottom: 30,
        borderRadius: 25,
        backgroundColor: colors.light
    },
    logoText: {
        fontWeight: "bold",
        fontSize: 36,
        letterSpacing: 30,
        textAlign: "center",
        width: 235,
        height: 50,
        color: "white",
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
        fontSize: 16,
        color: "#1c1c1c",
        textAlign: "center",
    },
})
