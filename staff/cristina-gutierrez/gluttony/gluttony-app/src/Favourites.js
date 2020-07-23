import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    ImageBackground,
    View,
    ScrollView
} from "react-native";
import { getFavourites } from "gluttony-client-logic";
import Store from "./Store"

const Favourites = (props) => {
    const [favourites, setFavourites] = useState();

    useEffect(() => {
        getFavourites()
            .then(favourites => setFavourites(favourites))
            .catch(() => props.onShowModal())
    }, [])

    return (
        <ImageBackground source={require("../assets/images/final-food-and-drink-pattern-vector-1.png")} style={styles.image}>
            <View style={styles.box}>
                <Text style={styles.textStyle}>Favourites</Text>
                <ScrollView>
                    { favourites && favourites.map(favourite => 
                        <View style={styles.store} key={favourite.id}>
                            <Store store={favourite} isFavourite={true} onShowModal={props.onShowModal} />
                        </View>
                    )}
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
        alignItems: "center"
    },
    box: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 40,
        marginBottom: 100,
        width: "75%"
    },
    store: {
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

export default Favourites