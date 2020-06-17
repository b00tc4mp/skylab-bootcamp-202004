import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import NomadTitle from '../components/NomadTitle'
import { ScrollView, FlatList } from 'react-native-gesture-handler'

import Review from '../components/Review'

export default ({ route }) => {
    const ws = route.params

    return (
        <View style={styles.container}>
            <ScrollView>

                <Image source={ws.photos[0] || require('../assets/default.jpg')} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <NomadTitle title={ws.name} />
                    <Text style={styles.address}>{ws.address.street}, {ws.address.city}, {ws.address.country}</Text>
                    <Text style={styles.price} >{ws.price.amount}€ / {ws.price.term}</Text>
                    <NomadTitle title='Description' />
                    <Text style={styles.description}>{ws.description}</Text>
                    <NomadTitle title='Features' />
                    <Text style={styles.description}>Wifi: 100mb</Text>
                    <Text style={styles.description}>Parking: 0.3km</Text>
                    <Text style={styles.description}>Coffee Included: Yes</Text>
                    <Text style={styles.description}>Meeting Rooms: 4</Text>
                    <NomadTitle title='Location' />
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={{ // provider={PROVIDER_GOOGLE}
                            latitude: ws.geoLocation.coordinates[1],
                            longitude: ws.geoLocation.coordinates[0],
                            latitudeDelta: 0.06,
                            longitudeDelta: 0.06,
                        }} >
                            <Marker coordinate={{
                                latitude: ws.geoLocation.coordinates[1],
                                longitude: ws.geoLocation.coordinates[0]
                            }} onPress={() => console.log('clicked')} />
                        </MapView>
                    </View>
                    <NomadTitle title='Capacity' />
                    <Text style={styles.description}>Capacity: {ws.capacity}</Text>
                    <Text style={styles.description}>Avaliable: 1</Text>
                    <NomadTitle title='Reviews' />
                    <View>
                        <FlatList data={reviews} keyExtractor={(review) => review.name}
                            renderItem={({ item }) =>
                                <Review
                                    image={item.image}
                                    name={item.name}
                                    stars={item.stars}
                                    review={item.review}
                                />
                            } />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const reviews = [
    {
        name: 'Aitor Truji',
        stars: 4,
        review: 'This is the best known cowork out there.',
        image: require('../assets/aitor.jpg'),
    },
    {
        name: 'Llorch',
        stars: 3,
        review: 'Too much bugs here.',
        image: require('../assets/aitor.jpg'),
    },
    {
        name: 'Serginho',
        stars: 5,
        review: 'Awesome place to make callbacks.',
        image: require('../assets/aitor.jpg'),
    },
    {
        name: 'Dani',
        stars: 1,
        review: 'They do not open at night.',
        image: require('../assets/aitor.jpg'),
    },

]

const styles = StyleSheet.create({
    container: {
        marginBottom: 70
    },
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
        marginVertical: 5,

    },
    description: {
        paddingBottom: 15,
        color: 'grey',
        fontSize: 18,
        textAlign: 'justify'
    },
    price: {
        color: 'grey',
        fontSize: 18,
        // fontWeight: 'bold',
        textAlign: 'left',
        fontWeight: 'bold',
        width: '100%',
        paddingBottom: 15,
    },
    mapContainer: {
        width: '100%',
        height: 250,
        borderRadius: 25,
        marginBottom: 15,
        // flex: 1
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: 250,
        borderRadius: 25,
    }

})
