import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    ImageBackground
} from "react-native";
import { retrieveUser } from "../gluttony-client-logic";

const Favourites = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        retrieveUser()
            .then(user => setUser(user))
            .catch(() => props.onShowModal())
    }, [])

    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <Text style={styles.textStyle}>Favourites</Text>
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

export default Favourites