import React from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Image
} from "react-native";
import AppButton from '../components/AppButton'


export default function Login() {
    return (
        <ImageBackground style={styles.container} source={require('../assets/puzzle.jpg')}>
            <Image style={styles.logo} source={require('../assets/logo.svg')}></Image>
            <AppButton title="Login" onPress={() => console.log('tapped')}></AppButton>
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
    }
});