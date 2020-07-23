import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
    StyleSheet,
    View,
    Dimensions,
    Image
} from "react-native";
import { findNearbyRestaurants, getFavourites } from "gluttony-client-logic"
import Store from "./Store"

const MapRestaurant = props => {
    const [userLatitude, setUserLatitude] = useState();
    const [userLongitude, setUserLongitude] = useState();
    const [restaurants, setRestaurants] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async pos => {
            setUserLatitude(pos.coords.latitude)
            setUserLongitude(pos.coords.longitude)

            const restaurants = await findNearbyRestaurants(pos.coords.latitude, pos.coords.longitude)
            getFavourites()
                .then(favourites => {
                    restaurants && restaurants.forEach(restaurant => {
                        restaurant.favourite = !!favourites.find(favourite => favourite.id === restaurant.id)
                    })
                })
                .catch(() => {})
                .finally(() => setRestaurants(restaurants))
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
                > 
                    <Image source={ require('../assets/images/person-eating.png')} style={styles.marker}/>
                </Marker>}
                { restaurants && restaurants.map(restaurant => <Marker
                    key={ restaurant.id }
                    coordinate={{
                        latitude: restaurant.coordinates.latitude,
                        longitude: restaurant.coordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    <Callout>
                        <Store store={restaurant} isFavourite={restaurant.favourite} onShowModal={props.onShowModal} />
                    </Callout>
                </Marker>)}
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
    },
    marker: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    }
});

export default MapRestaurant