import React, { useState } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Image
} from "react-native";
import AppButton from '../components/AppButton'
import AppTextInput from '../components/AppTextInput'
import { registerUser } from 'escape-me-client-logic'

export default function Register({ onLogin }) {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    function handleRegister() {
        try {
            return registerUser(name, surname, username, email, password)
                .then(() => onLogin())
                .catch(error => setError(error.message))
        } catch ({ message }) {
            setError(message)
        }
    }

    return (
        <ImageBackground style={styles.container} source={require('../assets/puzzle.jpg')}>
            <View style={styles.buttonsContainer}>
                <Image style={styles.logo} source={require('../assets/logo.svg')}></Image>
                <AppTextInput placeholder="Name"
                    onChangeText={text => setName(text)} />
                <AppTextInput placeholder="Surname"
                    onChangeText={text => setSurname(text)} />
                <AppTextInput placeholder="Username" autoCapitalize="none"
                    onChangeText={text => setUsername(text)} />
                <AppTextInput placeholder="Email" icon="email" autoCapitalize="none"
                    keyboardType="email-address" textContentType="emailAddress"
                    onChangeText={text => setEmail(text)} />
                <AppTextInput placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false} icon="lock" secureTextEntry
                    textContentType="password" onChangeText={text => setPassword(text)} />
                <AppButton style={styles.register} title='Register' color='#4ecdc4' onPress={handleRegister} />
                <AppButton title="Login" onPress={onLogin}></AppButton>
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
        marginTop: 30,
        marginBottom: 20
    },
    register: {
        position: 'absolute',
        bottom: 10
    }
});