import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions
} from "react-native";
import { findNearbyBars } from "../gluttony-client-logic"

const MapBar = () => {
    const [userLatitude, setUserLatitude] = useState();
    const [userLongitude, setUserLongitude] = useState();
    const [barLatitude, setBarLatitude] = useState();
    const [barLongitude, setBarLongitude] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setUserLatitude(pos.coords.latitude)
            setUserLongitude(pos.coords.longitude)

            findNearbyBars(pos.coords.latitude, pos.coords.longitude)
                .then(coordinates => {
                    setBarLatitude(coordinates.latitude)
                    setBarLongitude(coordinates.longitude)
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
                    title="Nearest bar"
                    coordinate={{
                        latitude: barLatitude,
                        longitude: barLongitude,
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

export default MapBar