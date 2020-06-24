import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, RefreshControl, FlatList, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import NomadTitle from '../components/NomadTitle'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import Communications from 'react-native-communications'

import { API_URL } from 'nomad-client-logic/context'
import AppButton from '../components/Button'
import Review from '../components/Review'
import colors from '../styles/colors'
import toggleFavorites from 'nomad-client-logic/toggle-favorites'
import AsyncStorage from '@react-native-community/async-storage'
import { retrieveWorkspaceById } from 'nomad-client-logic'
import Feedback from '../components/Feedback'

export default ({ route, navigation }) => {
    const { workspace, user } = route.params
    const [isFav, setIsFav] = useState(user.favorites.indexOf(workspace._id) === -1)
    const [refresh, setRefresh] = useState(false)
    const [ws, setWs] = useState(workspace)
    const [error, setError] = useState()

    useEffect(() => {
        (async () => await refreshWorkspace(ws))()
    }, [])

    const refreshWorkspace = async ({ _id }) => {
        try {
            const result = await retrieveWorkspaceById(_id)
            setWs(result)
        } catch (e) {
            setError(e.message)
        }

    }

    const handleFavoritePress = async () => {
        try {
            await toggleFavorites(ws._id)
            isFav ? setIsFav(false) : setIsFav(true)
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => refreshWorkspace(ws)} />}>
                <Image source={{ uri: `${API_URL}/workspaces/${workspace._id}.jpg` }} style={styles.image} />
                <TouchableOpacity style={styles.phoneCircle} onPress={() => Communications.phonecall(ws.phone, true)}>
                    < FontAwesome5 name="phone" size={36} color='forestgreen' />
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    {error && <Feedback message={error} color='#5d5d5a' />}
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
                    <Text style={styles.description}>Wifi: {ws.features.wifi === true ? '✅' : '❌'}</Text>
                    <Text style={styles.description}>Parking: {ws.features.parking === true ? '✅' : '❌'}</Text>
                    <Text style={styles.description}>Coffee Included: {ws.features.coffee === true ? '✅' : '❌'}</Text>
                    <Text style={styles.description}>Meeting Rooms: {ws.features.meetingRooms === true ? '✅' : '❌'}</Text>
                    <NomadTitle title='Capacity' />
                    <Text style={styles.description}>Capacity: {ws.capacity}</Text>
                    <NomadTitle title='Location' />
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={{
                            latitude: ws.geoLocation.coordinates[1],
                            longitude: ws.geoLocation.coordinates[0],
                            latitudeDelta: 0.06,
                            longitudeDelta: 0.06,
                        }} >
                            <Marker coordinate={{
                                latitude: ws.geoLocation.coordinates[1],
                                longitude: ws.geoLocation.coordinates[0]
                            }} />
                        </MapView>
                    </View>
                    <NomadTitle title='Reviews' />
                    <View style={styles.center} >
                        <AppButton title='Post Review' bgColor='secondary' txtColor='light' onPress={() => navigation.navigate('ReviewPage', ws._id)} />
                        {ws.reviews && <FlatList data={ws.reviews} keyExtractor={(review) => review.name + Math.random().toString()}
                            renderItem={({ item }) => {
                                return <Review
                                    image={{ uri: `${API_URL}/users/${item.user._id}.jpg` }}
                                    name={item.user.name}
                                    surname={item.user.surname}
                                    stars={item.stars}
                                    review={item.text}
                                />
                            }} />}

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

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
    phoneCircle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        top: 270,
        zIndex: 10
    },
    detailsContainer: {
        padding: 20,
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
    },
    map: {
        marginTop: 10,
        width: '100%',
        height: 250,
        borderRadius: 25,
    }
})
