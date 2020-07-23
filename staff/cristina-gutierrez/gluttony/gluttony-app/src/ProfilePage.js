import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    View
} from "react-native";
import { retrieveUser, logout } from "gluttony-client-logic";

const ProfilePage = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        retrieveUser()
            .then(user => setUser(user))
            .catch(() => props.onShowModal())
    }, [])

    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <View style={styles.boxOne}>
                { user && <Text style={{ ...styles.textStyle, backgroundColor: "#FFFC87" }}>Welcome {user.name} {user.surname}</Text> }
            </View>
            <View style={styles.boxTwo}>
                <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoToComments() }>
                    <Text style={{ ...styles.textStyle, fontSize: 24 }}>Comments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.openButton} onPress={() => {
                    logout().then(() => props.onGoToHome())
                }}>
                    <Text style={{ ...styles.textStyle, fontSize: 24 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    openButton: {
        padding: 2,
        height: 65,
        width: 150,
        borderRadius: 200,
        backgroundColor: "#FFFC87",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 3,
        marginBottom: 18
    },
    textStyle: {
        color: "black",
        fontWeight: "800",
        textAlign: "center",
        fontSize: 30
    },
    boxOne: {
        flex: 0.4,
        justifyContent: "flex-start",
        marginTop: 60
    },
    boxTwo: {
        flex: 1,
        justifyContent: "flex-start"
    }
})

export default ProfilePage