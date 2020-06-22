import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import NomadTitle from '../components/NomadTitle'
import { FlatList } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions'
import * as Location from "expo-location";
import AsyncStorage from '@react-native-community/async-storage'

import { API_URL } from 'nomad-client-logic/context'
import retrieveUser from 'nomad-client-logic/retrieve-user'
import retrieveWorkspaces from 'nomad-client-logic/retrieve-workspaces'
import Card from '../components/Card'

export default ({ navigation }) => {

    const [latitude, setLatitude] = useState(41.47566020027821)
    const [longitude, setLongitude] = useState(2.197265625)
    const [workspaces, setWorkspaces] = useState(undefined)
    const [user, setUser] = useState()

    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (!result.granted) alert('I need to access location to perform well :(')
    }

    const getLocationWorkspaces = async (location) => {
        try {
            const user = await retrieveUser()
            setUser(user)
            const result = await retrieveWorkspaces(location)
            setWorkspaces(result)
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    useEffect(() => {
        (async () => {
            await getPermissions()
            const { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync()
            setLatitude(latitude)
            setLongitude(longitude)
            await getLocationWorkspaces({ latitude, longitude })
        })()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={[styles.iconCircle, styles.buttonWrapper]}>
                    <MaterialCommunityIcons name="chevron-left" size={30} color='white' onPress={() => navigation.goBack()} />
                </View>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.06,
                        longitudeDelta: 0.06,
                    }} >
                        {latitude && longitude && <Marker
                            draggable
                            coordinate={{
                                latitude: latitude,
                                longitude: longitude
                            }}
                            image={require('../assets/locateuser.png')}
                            onDragEnd={({ nativeEvent: { coordinate } }) => { setLatitude(coordinate.latitude); setLongitude(coordinate.longitude); getLocationWorkspaces(coordinate) }}
                            onPress={() => console.log('clicked')}
                        />}
                        {workspaces && workspaces.map(ws =>
                            (<Marker coordinate={{
                                latitude: ws.geoLocation.coordinates[1],
                                longitude: ws.geoLocation.coordinates[0]
                            }} title={ws.name} key={ws.geoLocation.coordinates[1] + ws.geoLocation.coordinates[0] + Math.random()} description={ws.description}
                            />)
                        )}
                    </MapView>
                </View>
                <View style={styles.listContainer}>
                    <NomadTitle title='Workspaces near you' color='white' />
                    <FlatList horizontal data={workspaces} keyExtractor={(workspace) => workspace._id + Math.random().toString()}
                        renderItem={({ item }) =>
                            <Card
                                title={item.name}
                                address={`${item.address.street}, ${item.address.city}`}
                                rating={item.score}
                                price={`${item.price.amount}€ / ${item.price.term}`}
                                image={{ uri: `${API_URL}/workspaces/${item._id}.jpg` } || require('../assets/default.jpg')}
                                onPress={() => navigation.navigate('WorkspacePage', { workspace: item, user })}
                                width={320}
                                marginRight={10}
                                imgHeight={130}
                            />
                        } />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#1c1c1c',
        height: '100%'
    },
    container: {
        marginHorizontal: 0,
        backgroundColor: '#1c1c1c',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#1c1c1c",
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    buttonWrapper: {
        position: 'absolute',
        left: 30,
        top: 22,
        zIndex: 10,
    },
    mapContainer: {
        marginHorizontal: 20,
        height: 530,
        borderRadius: 25,
    },
    listContainer: {
        marginTop: 20,
        marginLeft: 20,
        height: 280,
        borderRadius: 25,
    },
    map: {
        marginTop: 10,
        width: '100%',
        flex: 1,
        height: 250,
        borderRadius: 25,
    }
})
