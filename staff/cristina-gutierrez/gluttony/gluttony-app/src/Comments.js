import React from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View
} from "react-native";

const Comments = () => {
    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <View style={styles.boxOne}>
                <Text style={styles.textStyle}>Comments</Text>
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

export default Comments