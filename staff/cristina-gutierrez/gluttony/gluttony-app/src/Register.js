import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { registerUser } from "../gluttony-client-logic"

const Register = props => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.modalView}>
            <Image source={ require("../assets/images/logo-without-color-version.png")} style={styles.logo}/>
            <TextInput
                placeholder="name"
                value={name}
                style={styles.input}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="surname"
                value={surname}
                style={styles.input}
                onChangeText={(text) => setSurname(text)}
            />
            <TextInput
                placeholder="email"
                value={email}
                style={styles.input}
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="password"
                value={password}
                style={styles.input}
                autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.openButton} onPress={() => registerUser(name, surname, email, password)} >
                <Text style={styles.textStyle}>Registrarse</Text>
            </TouchableOpacity>
            <Text style={{ ...styles.modalText, marginBottom: 8 }}>o</Text>
            <Text style={{ ...styles.textStyle, textDecorationLine: "underline" }} onPress={props.onGoToLogin}>
                ¿Ya tienes una cuenta? Inicia sesión
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#FFFC87",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 8
    },
    textStyle: {
        color: "black",
        fontWeight: "500",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontWeight: "600",
        textAlign: "center"
    },  
    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain"
    },
    input: {
        height: 40,
        width: 220,
        borderColor: "#FFFC87",
        borderWidth: 3,
        marginBottom: 11,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20
    }
})

export default Register