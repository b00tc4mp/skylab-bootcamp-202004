import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    ScrollView
} from "react-native";
import { getUserComments } from "gluttony-client-logic"
require("gluttony-commons/polyfills/date")

const Comments = () => {
    const [comments, setComments] = useState();

    useEffect(() => {
        getUserComments()
            .then(comments => setComments(comments))
            .catch(() => props.onShowModal())
    }, [])

    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <View style={styles.box}>
                <Text style={styles.textStyle}>Comments</Text>
                <ScrollView>
                    { comments && comments.map(comment => {
                        comment.creationDate = new Date(comment.creationDate).toHumanFormat()
                        
                        return <View style={styles.comment} key={comment.id}>
                            <Text>{comment.store.name}</Text>
                            <Text>{comment.creationDate}</Text>
                            <Text>{comment.text}</Text>
                        </View>
                    })}
                </ScrollView>
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
    box: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 60
    },
    comment: {
        backgroundColor: "#D9D9D9",
        marginTop: 30,
        padding: 10
    },
    textStyle: {
        color: "black",
        backgroundColor: "#FFFC87",
        fontWeight: "800",
        textAlign: "center",
        fontSize: 30,
    }
})

export default Comments