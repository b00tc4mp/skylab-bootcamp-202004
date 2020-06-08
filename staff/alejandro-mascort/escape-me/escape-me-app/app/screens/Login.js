import React from "react";
import {
    StyleSheet,
    View,
    ImageBackground
} from "react-native";
import AppButton from '../components/AppButton'


export default function Login() {
    return (
        <ImageBackground style={styles.container} source={require('../assets/puzzle.jpg')}>
            <AppButton title="Login" onPress={() => console.log('tapped')}></AppButton>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});