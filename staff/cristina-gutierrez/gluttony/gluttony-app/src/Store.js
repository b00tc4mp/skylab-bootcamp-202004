import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from "react-native";
import { addFavourite, removeFavourite } from "gluttony-client-logic";
import postComment from "gluttony-client-logic/src/post-comment";
const { errors: { AuthenticationError } } = require("gluttony-commons")

const Store = props => {
    const [comment, setComment] = useState("");
    const [feedback, setFeedback] = useState();

    return (
        <View>
            <Image source={{uri: props.store.thumbnail}} style = {{height: 50, width: 50, margin: 5 }} />
            <Text>{props.store.name}</Text>
            <Text>{props.store.type}</Text>
            { props.isFavourite ? <TouchableOpacity style={styles.button} title= "Remove favourite" onPress={() => {
                removeFavourite(props.store.id).catch(props.onShowModal)
            }} >
                <Text style={{ ...styles.textStyle, textAlign: "center" }}>Remove favourite</Text>
            </TouchableOpacity> : <TouchableOpacity style={styles.button} title= "Add to favourites" onPress={() => {
                addFavourite(props.store.id).catch(props.onShowModal)
            }} >
                <Text style={{ ...styles.textStyle, textAlign: "center" }}>Add to favourites</Text>
            </TouchableOpacity>}
            <Text style={styles.textStyle}>Leave a comment:</Text>
            <TextInput
                placeholder="Give your opinion"
                value={comment}
                style={styles.input}
                onChangeText={ text => setComment(text) } 
            />
            {feedback && <Text style={styles.feedbackText}>{feedback}</Text>}
            <TouchableOpacity style={{ ...styles.button, marginTop: 0, width: 70 }} title= "Send" onPress={() => {
                try {
                    postComment(comment, props.store.id)
                        .then(() => setFeedback("Comment sent"), error => {
                            if (error instanceof AuthenticationError) {
                                props.onShowModal()
                            }

                            setFeedback(error.message)
                        })
                } catch(error) {
                    setFeedback(error.message)
                }
            }} >
                <Text style={{ ...styles.textStyle, textAlign: "center" }}>Send</Text>
            </TouchableOpacity>
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
    },
    feedbackText: {
        marginBottom: 8,
        marginTop: 1,
        fontWeight: "500",
        textAlign: "left",
        paddingLeft: 8,
        paddingRight: 8,
        color: "red"
    }
})

export default Store