import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import Login from "./Login";
import Register from "./Register";

const ModalAuthentication = (props) => {
    const [view, setView] = useState("login");

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <KeyboardAvoidingView
                behavior='padding' 
                style={styles.centeredView}
                >
                { view === "login" && <Login 
                    onGoToRegister={ () => setView("register") } 
                    onCloseModal={() => {
                        props.onHideModal()
                        props.onGoToHome() 
                    }}
                /> }
                { view === "register" && <Register 
                    onGoToLogin={ () => setView("login") } 
                /> }
            </KeyboardAvoidingView>
        </Modal>
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