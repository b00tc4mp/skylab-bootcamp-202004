import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import NomadTitle from '../components/NomadTitle'

export default ({ route }) => {
    const ws = route.params

    return (
        <View>
            <Image source={ws.image} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title} >{ws.title}</Text>
                <Text style={styles.address}>{ws.address}</Text>
                <Text style={styles.price} >{ws.price}</Text>
                <NomadTitle title='Location' />
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={{
                        latitude: 41.39847481085562,
                        longitude: 2.1998162012127014,
                        // latitudeDelta: 0.0922,
                        // longitudeDelta: 0.0421,
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 5
    },
    address: {
        color: 'grey',
        fontSize: 18,
        marginVertical: 5
    },
    price: {
        color: 'grey',
        // fontWeight: 'bold',
        textAlign: 'left',
        fontWeight: 'bold',
        width: '100%',
    },
    mapContainer: {
        width: '100%',
        height: 250,
        borderRadius: 25,
        // flex: 1
    },
    map: {
        width: '100%',
        height: 250,
        borderRadius: 25,
    }

})
