import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import AppButton from '../components/Button'
import AppTextInput from '../components/AppTextInput'

import colors from '../styles/colors'

const bgImage = require('../assets/background.jpg')

export default ({ handleRegister }) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <ImageBackground source={bgImage} style={[styles.background, { paddingBottom: 30 }]}>
            <View style={styles.textContainer}>
                <Text style={styles.logoText} >nomad</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.claimText} >
                    Sign up
                </Text>
                <AppTextInput
                    icon='email'
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    onChangeText={text => setEmail(text)}
                />
                <AppTextInput
                    icon='lock'
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    textContentType='password'
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <AppButton title='Sign up!' bgColor='secondary' txtColor='light' onPress={() => console.log(email, password)} />
            </View>
        </ImageBackground>

    );

};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // resizeMode: 'cover',
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
        marginTop: 50,
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    registerBtn: {
        width: '85%',
        height: 70,
        backgroundColor: colors.primary,
        borderRadius: 40,
    },
    loginBtn: {
        marginTop: 20,
        marginBottom: 40,
        width: '85%',
        height: 70,
        backgroundColor: colors.secondary,
        borderRadius: 40,
    }
})
