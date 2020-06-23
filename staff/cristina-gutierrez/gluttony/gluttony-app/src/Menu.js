import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions
} from "react-native";

let { width } = Dimensions.get("window");
const BUTTON_COUNT = 3;

const Menu = props => {
    return (
        <View style={styles.menu} visible={true}>
            <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoTo("home") }>
                <Text style={styles.textStyle}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoTo("favourites") }>
                <Text style={styles.textStyle}>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoTo("profilePage") }>
                <Text style={styles.textStyle}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        bottom: 0,
        flex: 1,
        flexDirection: "row"
    },
    openButton: {
        padding: 2,
        height: 60,
        width: width / BUTTON_COUNT,
        backgroundColor: "#FFFC87",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end",
        borderColor: "black"
    },
    textStyle: {
        color: "black",
        fontWeight: "500",
        fontSize: 20
    }
})

export default Menu