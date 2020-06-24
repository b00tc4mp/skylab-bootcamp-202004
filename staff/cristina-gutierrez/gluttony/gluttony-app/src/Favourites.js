import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    Image
} from "react-native";
import { getFavourites } from "../gluttony-client-logic";

const Favourites = (props) => {
    const [favourites, setFavourites] = useState();

    useEffect(() => {
        getFavourites()
            .then(favourites => setFavourites(favourites))
            .catch(() => props.onShowModal())
    }, [])

    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <View style={styles.boxOne}>
                <Text style={styles.textStyle}>Favourites</Text>
                { favourites && favourites.map(favourite =>
                    <View style={styles.store}>
                        <Image source={{uri: favourite.thumbnail}} style = {{height: 50, width: 50, margin: 5 }} />
                        <Text>{favourite.name}</Text>
                        <Text>{favourite.type}</Text>
                    </View>
                )}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    store: {
        backgroundColor: "#FFFFFF",
        marginTop: 30
    },
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