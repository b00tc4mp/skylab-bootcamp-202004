import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import Comments from "./Comments";
import { retrieveUser, logout } from "../gluttony-client-logic";

const ProfilePage = (props) => {
    const [showComments, setShowComments] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        retrieveUser()
            .then(user => setUser(user))
            .catch(() => props.onShowModal())
    }, [])

    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            { user && <Text style={styles.textStyle}>Welcome {user.name} {user.surname}</Text> }
            <TouchableOpacity style={styles.openButton} onPress={ () => setShowComments(!showComments) }>
                <Text style={styles.textStyle}>Comments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={() => {
                logout().then(() => props.onGoToHome())
            }}>
                <Text style={styles.textStyle}>Logout</Text>
            </TouchableOpacity>
            { showComments === "comments" && <Comments /> }
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
        width: 100,
        borderRadius: 200,
        backgroundColor: "#FFFC87",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 3
    },
    textStyle: {
        color: "black",
        fontWeight: "800",
        textAlign: "center",
        fontSize: 30
    }
})

export default ProfilePage