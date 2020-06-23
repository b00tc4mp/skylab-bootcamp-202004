import React from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";

let { width } = Dimensions.get("window");
const BUTTON_COUNT = 3;

const Menu = props => {
    return (
        <View style={styles.menu} visible={true}>
            <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoTo("home") }>
                <Image source={ require('../assets/images/logo-one.png')} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoTo("favourites") }>
                <Image source={ require('../assets/images/logo-two.png')} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.openButton} onPress={ () => props.onGoTo("profilePage") }>
                <Image source={ require('../assets/images/logo-three.png')} style={styles.icon}/>
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
    icon: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    }
    /* textStyle: {
        color: "black",
        fontWeight: "500",
        fontSize: 20
    } */
})

export default Menu