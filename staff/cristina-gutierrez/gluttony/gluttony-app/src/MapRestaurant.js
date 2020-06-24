import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions
} from "react-native";
import { findNearbyRestaurants, getFavourites } from "../gluttony-client-logic"
import Store from "./Store"

const MapRestaurant = props => {
    const [userLatitude, setUserLatitude] = useState();
    const [userLongitude, setUserLongitude] = useState();
    const [restaurant, setRestaurant] = useState();
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
            navigator.geolocation.getCurrentPosition(pos => {
                setUserLatitude(pos.coords.latitude)
                setUserLongitude(pos.coords.longitude)
    
                findNearbyRestaurants(pos.coords.latitude, pos.coords.longitude)
                    .then(restaurant => setRestaurant(restaurant))
                    .then(() => getFavourites())
                    .then(favourites => {
                        if (!Array.isArray(favourites)) return
                        setIsFavourite(!!favourites.find(favourite => favourite.id === restaurant.id))
                    })
            })
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                
                initialRegion={userLatitude && userLongitude && ({
                    latitude: userLatitude,
                    longitude: userLongitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.00021
                })}>
                { userLatitude && userLongitude && <Marker
                    title="You are here"
                    coordinate={{
                        latitude: userLatitude,
                        longitude: userLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}  
                /> }
                { restaurant && <Marker
                    coordinate={{
                        latitude: restaurant.coordinates.latitude,
                        longitude: restaurant.coordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    <Callout>
                        <Store store={bar} isFavourite={isFavourite} onShowModal={props.onShowModal} />
                    </Callout>
                </Marker>}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFC87",
        alignItems: "center",
        justifyContent: "center"
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        marginBottom: 60
    }
});

export default MapRestaurant