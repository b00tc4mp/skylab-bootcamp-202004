import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from "react-native";

const Map = () => {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude)
        })
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                
                initialRegion={latitude && longitude && ({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.00021
                })}>
                <Marker
                    title="Cris!"
                    coordinate={{
                        latitude,
                        longitude,
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

export default Map