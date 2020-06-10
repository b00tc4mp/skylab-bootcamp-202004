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

export default function Login({ onRegister, onHome, handleToken }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    function handleLogin() {
        try {
            return authenticateUser(email, password)
                .then(token => {
                    handleToken(token)
                    onHome()
                })
                .catch(error => console.error(error.message))
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <ImageBackground style={styles.container} source={require('../assets/puzzle.jpg')}>
            <Image style={styles.logo} source={require('../assets/logo.svg')}></Image>
            <View style={styles.buttonsContainer}>
                <AppTextInput placeholder="Email" icon="email" autoCapitalize="none"
                    keyboardType="email-address" textContentType="emailAddress"
                    onChangeText={text => setEmail(text)} />
                <AppTextInput placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false} icon="lock" secureTextEntry
                    textContentType="password" onChangeText={text => setPassword(text)} />
                <AppButton title="Login" onPress={handleLogin}></AppButton>
                <AppButton style={styles.register} title='Register' color='#4ecdc4' onPress={onRegister} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        padding: 20,
        width: '100%'
    },
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