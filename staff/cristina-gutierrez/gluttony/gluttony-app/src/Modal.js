import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "./Login";
import Register from "./Register";

const ModalAuthentication = () => {
        const [modalVisible, setModalVisible] = useState(false);
        const [view, setView] = useState("login");

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
                        { view === "login" ? <Login 
                            onGoToRegister={ () => setView("register") } 
                            onCloseModal={() => setModalVisible(false) }
                        /> : <Text /> }
                        { view === "register" ? <Register 
                            onGoToLogin={ () => setView("login") } 
                            onCloseModal={() => setModalVisible(false) }
                        /> : <Text /> }
                    </View>
                </Modal>

                <TouchableOpacity
                    style={styles.openButton}
                    onPress={() => {
                    setModalVisible(true);
                    }}
                >
                    <Text style={styles.textStyle}>Accede a Gluttony</Text>
                </TouchableOpacity>
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
    }
})

export default ModalAuthentication