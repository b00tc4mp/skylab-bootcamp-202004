import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground
} from "react-native";

const Home = props => {
    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <TouchableOpacity style={styles.openButton} onPress={props.onGoToMapBar}>
                <Text style={styles.textStyle}>I'm thirsty</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={props.onGoToMapRestaurant}>
                <Text style={styles.textStyle}>I'm hungry</Text>
            </TouchableOpacity>
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
        height: 150,
        width: 150,
        borderRadius: 400,
        backgroundColor: "#FFFC87",
        marginBottom: 25,
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

export default Home