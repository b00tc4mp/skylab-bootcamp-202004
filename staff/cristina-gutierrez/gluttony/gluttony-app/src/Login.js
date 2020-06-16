import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";
import { authenticateUser } from "../gluttony-client-logic"

const Login = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <TouchableWithoutFeedback>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Inicia sesión para ver más</Text>
                <Image source={ require('../assets/images/logo-without-color-version.png')} style={styles.logo}/>
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
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity style={styles.openButton} onPress={() => authenticateUser(email, password)}>
                    <Text style={styles.textStyle}>Iniciar sesión</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.modalText, marginBottom: 8 }}>o</Text>
                <TouchableOpacity style={styles.openButton} onPress={props.onGoToRegister}>
                    <Text style={styles.textStyle}>Regístrate</Text>
                </TouchableOpacity>

                <Text 
                    style={{ ...styles.modalText, marginTop: 20, textDecorationLine: "underline", fontWeight: "300" }} 
                    onPress={props.onCloseModal}>
                    Mejor en otro momento
                </Text>
            </View>
        </TouchableWithoutFeedback>
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

export default Login