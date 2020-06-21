import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Platform, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as Location from "expo-location";
import AsyncStorage from '@react-native-community/async-storage'

import { API_URL } from 'nomad-client-logic/context'
import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import AppTextInput from '../components/NomadTextInput'
import NomadTitle from '../components/NomadTitle'
import retrieveWorkspaces from 'nomad-client-logic/retrieve-workspaces'
import retrieveUser from 'nomad-client-logic/retrieve-user'




export default function Home({ navigation }) {
    const [workspaces, setWorkspaces] = useState([])
    const [user, setUser] = useState()
    const [image, setImage] = useState()
    const [refresh, setRefresh] = useState(false)
    const [categoryPressed, setCategoryPressed] = useState('')

    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (!result.granted) alert('I need to access location to perform well :(')
    }

    const getLocationWorkspaces = async (filter) => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const user = await retrieveUser(token)
                setUser(user)
                setImage({ uri: `${API_URL}/users/${user.id}.jpg` })
                const { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync()
                const result = await retrieveWorkspaces(token, { latitude, longitude }, filter)
                if (result) setWorkspaces(result)
            } else {
                console.log('error, token not found in homescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    useEffect(() => {
        (async () => {
            await getPermissions()
            await getLocationWorkspaces(categoryPressed)
        })()
    }, [categoryPressed])

    return (

        <View style={styles.container}>
            <View style={styles.containerHeader}>
                {user && <NomadHeader
                    title={user && `Hi, ${user.name}!`}
                    subTitle="Find your next workspace 🌴"
                    imageSource={image}
                    onError={() => setImage(require('../assets/profile.png'))}
                    onPress={() => navigation.navigate('Profile')}
                />}
            </View>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => getLocationWorkspaces(categoryPressed)} />}>
                <View style={styles.containerSearch}>
                    <AppTextInput
                        icon='magnify'
                        placeholder='Search workspace'
                        maxLength={100}
                        autoCorrect={false}
                        keyboardType={Platform.OS === 'ios' ? 'web-search' : 'default'}
                        textContentType='organizationName'
                        onFocus={() => navigation.navigate('SearchScreen')}
                    />
                    <NomadTitle title='Categories' />
                    <View style={styles.categoryContainer} >
                        <TouchableOpacity style={styles.categoryButton} onPress={() => categoryPressed === 'cowork' ? setCategoryPressed('') : setCategoryPressed('cowork')} >
                            < Image source={require('../assets/cat-cowork.png')} style={categoryPressed === 'cowork' ? styles.categoryPress : styles.category} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton} onPress={() => categoryPressed === 'coffee' ? setCategoryPressed('') : setCategoryPressed('coffee')} >
                            < Image source={require('../assets/cat-coffee.png')} style={categoryPressed === 'coffee' ? styles.categoryPress : styles.category} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryContainer} >
                        <TouchableOpacity style={styles.categoryButton} onPress={() => categoryPressed === 'library' ? setCategoryPressed('') : setCategoryPressed('library')} >
                            < Image source={require('../assets/cat-library.png')} style={categoryPressed === 'library' ? styles.categoryPress : styles.category} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton} onPress={() => categoryPressed === 'shared space' ? setCategoryPressed('') : setCategoryPressed('shared space')} >
                            < Image source={require('../assets/cat-shared.png')} style={categoryPressed === 'shared space' ? styles.categoryPress : styles.category} />
                        </TouchableOpacity>
                    </View>


                    <NomadTitle title='Popular near you' />
                </View>
                <View style={styles.containerCards}>
                    <FlatList data={workspaces} keyExtractor={(workspace) => { return workspace._id + Math.random().toString() }}
                        renderItem={({ item }) =>
                            <Card
                                title={item.name}
                                address={`${item.address.street}, ${item.address.city}`}
                                rating={item.score}
                                price={`${item.price.amount}€ / ${item.price.term}`}
                                image={{ uri: `${API_URL}/workspaces/${item._id}.jpg` } || require('../assets/default.jpg')}
                                onPress={() => navigation.navigate('WorkspacePage', { workspace: item, user })}
                            />
                        } />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 30 : 15,
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        overflow: 'hidden'
    },
    containerHeader: {
        paddingTop: 40,
    },
    containerSearch: {
        paddingHorizontal: 20
    },
    categoryContainer: {
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10
    },
    category: {
        width: 160,
        borderRadius: 25,
        height: 80,

    },
    categoryPress: {
        opacity: 0.5,
        width: 160,
        borderRadius: 25,
        height: 80,
    },
    categoryButton: {
        width: '50%'
    },
    containerCards: {
        height: '100%',
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 75 : 30,
        shadowOpacity: 0.6
    },
})