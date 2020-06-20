import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import NomadTitle from '../components/NomadTitle'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { API_URL } from 'nomad-client-logic/context'
import AppButton from '../components/Button'
import Review from '../components/Review'
import colors from '../styles/colors'
import toggleFavorites from 'nomad-client-logic/toggle-favorites'
import AsyncStorage from '@react-native-community/async-storage'
import { retrieveWorkspaceById } from 'nomad-client-logic'

export default ({ route, navigation }) => {
    const { workspace, user } = route.params
    const [isFav, setIsFav] = useState(user.favorites.indexOf(workspace._id) === -1)
    const [refresh, setRefresh] = useState(false)
    const [ws, setWs] = useState(workspace)

    const refreshWorkspace = async ({ _id }) => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const result = await retrieveWorkspaceById(token, _id)
                setWs(result)
            } else {
                console.log('error, token not found in homescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }

    }

    const handleFavoritePress = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                await toggleFavorites(token, ws._id)
                isFav ? setIsFav(false) : setIsFav(true)
            } else {
                console.log('error, token not found in workspacescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => refreshWorkspace(ws)} />}>

                <Image source={{ uri: `${API_URL}/workspaces/${workspace._id}.jpg` }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <View style={styles.topWrapper}>
                        <NomadTitle title={ws.name} fontSize={32} />
                        <TouchableOpacity style={styles.iconCircle} onPress={() => handleFavoritePress()}>
                            < MaterialCommunityIcons name="bookmark" size={30} color={isFav ? colors.primary : 'tomato'} />
                        </TouchableOpacity>

                    </View>
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
                    <View style={styles.center} >
                        <AppButton title='Post Review' bgColor='secondary' txtColor='light' onPress={() => navigation.navigate('ReviewPage', ws._id)} />
                        <FlatList data={ws.reviews} keyExtractor={(review) => review.name}
                            renderItem={({ item }) =>
                                <Review
                                    image={require('../assets/aitor.jpg')}
                                    name={item.name}
                                    stars={item.stars}
                                    review={item.text}
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
    center: {
        alignItems: 'center',
        marginTop: 15
    },
    topWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingBottom: 30,
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
