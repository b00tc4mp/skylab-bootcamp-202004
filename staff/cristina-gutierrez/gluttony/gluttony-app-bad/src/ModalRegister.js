import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  TextInput
} from "react-native";

const ModalRegister = () => {
        const [modalVisible, setModalVisible] = useState(false);
        const [name, setName] = useState();
        const [surname, setSurname] = useState();
        const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image source={ require('../assets/images/logo-without-color-version.png')} style={styles.logo}/>
                        <TextInput
                            placeholder="name"
                            value={name}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="surname"
                            value={surname}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="email"
                            value={email}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="password"
                            value={password}
                            style={styles.input}
                        />
                        <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                            <Text style={styles.textStyle}>Registrarse</Text>
                        </TouchableHighlight>
                        <Text style={{ ...styles.modalText, marginBottom: 8 }}>o</Text>
                        <Text style={{ ...styles.textStyle, textDecorationLine: "underline" }}
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                        >¿Ya tienes una cuenta? Inicia sesión</Text>
                    </View>
                    </View>
                </Modal>

                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                    setModalVisible(true);
                    }}
                >
                    <Text style={styles.textStyle}>Accede a Gluttony</Text>
                </TouchableHighlight>
            </View>
        )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
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
        paddingRight: 10
    }
})

export default ModalRegister