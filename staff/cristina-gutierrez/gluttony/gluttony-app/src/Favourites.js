import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View
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
            <View style={styles.boxOne}>
                <Text style={styles.textStyle}>Favourites</Text>
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
        alignItems: "center",
    },
    textStyle: {
        color: "black",
        backgroundColor: "#FFFC87",
        fontWeight: "800",
        textAlign: "center",
        fontSize: 30,
    },
    boxOne: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 60
    }
})

export default Favourites