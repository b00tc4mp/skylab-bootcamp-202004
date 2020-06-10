import React from 'react'
import { ImageBackground, StyleSheet, View, Image, Text, Platform } from 'react-native'
import AppButton from '../components/AppButton'

export default function ({ onLogin }) {
    return (
        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require('../assets/puzzle.jpg')}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo.svg')} />
                <Text style={styles.logoText}>Escape Me</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton title='Login' onPress={onLogin} />
                <AppButton title='Register' color='#4ecdc4' />
            </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    buttonsContainer: {
        padding: 20,
        width: '100%'
    },
    logoContainer: {
        alignItems: "center",
        position: 'absolute',
        top: 70,
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600',
        color: 'white',
        ...Platform.select({
            ios: {
                fontFamily: 'Avenir'
            },
            android: {
                fontFamily: 'Roboto'
            }
        })
    },
})