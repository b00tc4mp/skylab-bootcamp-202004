import React, { useState } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Image
} from "react-native";
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import { authenticateUser } from 'escape-me-client-logic'
// const { authenticateUser } = require('escape-me-client-logic')

export default function Login({ onRegister }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <ImageBackground style={styles.container} source={require('../assets/puzzle.jpg')}>
            <Image style={styles.logo} source={require('../assets/logo.svg')}></Image>
            <AppTextInput placeholder="Email" icon="email" autoCapitalize="none"
                keyboardType="email-address" textContentType="emailAddress"
                onChange={text => setEmail(text)} />
            <AppTextInput placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false} icon="lock" secureTextEntry
                textContentType="password" onChange={text => setPassword(text)} />
            <AppButton title="Login" onPress={() => console.log('tapped')}></AppButton>
            <AppButton style={styles.register} title='Register' color='#4ecdc4' />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    register: {
        position: 'absolute',
        bottom: 10
    }
});