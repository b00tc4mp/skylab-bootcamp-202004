import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from "react-native";
import { addFavourite } from "../gluttony-client-logic";

const Store = (props) => {
    return (
        <View style={styles.store}>
            <Image source={{uri: props.store.thumbnail}} style = {{height: 50, width: 50, margin: 5 }} />
            <Text>{props.store.name}</Text>
            <Text>{props.store.type}</Text>
            <TouchableOpacity style={styles.button} title= "Add to favourites" onPress={ () => addFavourite(props.store.id) }>
                <Text style={{ ...styles.textStyle, textAlign: "center" }}>Add to favourites</Text>
            </TouchableOpacity>
            <Text style={styles.textStyle}>Leave a comment:</Text>
            <TextInput style={styles.input} />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#FFFC87",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 8,
        marginTop: 8,
        width: 140,
    },
    textStyle: {
        color: "black",
        fontWeight: "500",
        textAlign: "left"
    },
    input: {
        height: 40,
        width: 150,
        borderColor: "#FFFC87",
        borderWidth: 3,
        marginBottom: 11,
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default Store