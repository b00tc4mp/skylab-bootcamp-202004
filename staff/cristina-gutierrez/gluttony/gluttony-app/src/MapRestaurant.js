import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions
} from "react-native";
import { findNearbyRestaurants } from "../gluttony-client-logic"

const MapRestaurant = () => {
    const [userLatitude, setUserLatitude] = useState();
    const [userLongitude, setUserLongitude] = useState();
    const [restaurantLatitude, setRestaurantLatitude] = useState();
    const [restaurantLongitude, setRestaurantLongitude] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setUserLatitude(pos.coords.latitude)
            setUserLongitude(pos.coords.longitude)

            findNearbyRestaurants(pos.coords.latitude, pos.coords.longitude)
                .then(coordinates => {
                    setRestaurantLatitude(coordinates.latitude)
                    setRestaurantLongitude(coordinates.longitude)
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
                <Marker
                    title="You are here"
                    coordinate={{
                        latitude: userLatitude,
                        longitude: userLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}  
                />
                <Marker
                    title="Nearest restaurant"
                    coordinate={{
                        latitude: restaurantLatitude,
                        longitude: restaurantLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}  
                />
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
    },
});

export default MapRestaurant