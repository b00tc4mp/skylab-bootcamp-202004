import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native'
import * as Permissions from 'expo-permissions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import WorkspacePage from './WorkspacePage'
import retrieveFavorites from 'nomad-client-logic/retrieve-favorites'
import { set } from 'react-native-reanimated'
import AsyncStorage from '@react-native-community/async-storage'
import retrieveUser from 'nomad-client-logic/retrieve-user'
import AppTextInput from '../components/NomadTextInput'
import { API_URL } from 'nomad-client-logic/context'



export default function Favorites({ navigation }) {
    const [favorites, setFavorites] = useState([])
    const [user, setUser] = useState()
    const [image, setImage] = useState()
    const [refresh, setRefresh] = useState(false)

    const getFavorites = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const user = await retrieveUser(token)
                setUser(user)
                setImage({ uri: `${API_URL}/users/${user.id}.jpg` })
                const result = await retrieveFavorites(token)
                if (result) setFavorites(result)
            } else {
                console.log('error, token not found in homescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    useEffect(() => {
        getFavorites()
    }, [favorites.length])


    const workspaces = [
        {
            title: 'WeWork Barcelona',
            address: '23 st, Barcelona',
            rating: '5',
            price: '99€ / month',
            image: require('../assets/cowork.jpg'),
        },
        {
            title: 'Happy Coders',
            address: 'Rambla 12, Barcelona',
            rating: '4',
            price: '10€ / day',
            image: require('../assets/happycoders.jpg'),
        }
    ]


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}></View>
            <NomadHeader
                title="Favorites"
                imageSource={image}
                onError={() => setImage(require('../assets/profile.png'))}
                subTitle="Come back to loved workspaces ❤️"
                onPress={() => navigation.navigate('Profile')}
            />
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => getFavorites()} />}>
                <View style={styles.containerSearch}>
                    <AppTextInput
                        icon='magnify'
                        placeholder='Search favorites'
                        maxLength={100}
                        autoCorrect={false}
                        keyboardType={Platform.OS === 'ios' ? 'web-search' : 'default'}
                        textContentType='organizationName'
                        onChangeText={(value) => console.log(value)}
                    // onBlur={() => setFieldTouched('workspaceName')}
                    />
                </View>
                <View style={styles.containerCards}>
                    {favorites && <FlatList data={favorites} keyExtractor={(workspace) => workspace.name + Math.random().toString()}
                        renderItem={({ item }) =>
                            <Card
                                title={item.name}
                                address={`${item.address.street}, ${item.address.city}`}
                                rating={item.score}
                                price={`${item.price.amount}€ / ${item.price.term}`}
                                image={item.photos[0] || require('../assets/default.jpg')}
                                onPress={() => navigation.navigate('WorkspacePage', { workspace: item, user })}
                            />
                        } />}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        flex: 1
    },
    containerHeader: {
        padding: 20,
    },
    containerSearch: {
        paddingHorizontal: 20
    },
    containerCards: {
        height: '100%',
        padding: 20,
        shadowOpacity: 0.5
    },
})