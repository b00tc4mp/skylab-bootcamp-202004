import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from "react-native";

let { width } = Dimensions.get("window");
let button_count = 3;

const Menu = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.openButton} onPress={props.onGoToHome}>
                <Text style={styles.textStyle}>I'm thirsty</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={props.onGoToProfile}>
                <Text style={styles.textStyle}>I'm hungry</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={props.onGoToFavourites}>
                <Text style={styles.textStyle}>I'm hungry</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
      },
    openButton: {
        padding: 2,
        height: 65,
        width: width / button_count,
        backgroundColor: "#FFFC87",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        alignSelf: "flex-end",
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

export default Menu