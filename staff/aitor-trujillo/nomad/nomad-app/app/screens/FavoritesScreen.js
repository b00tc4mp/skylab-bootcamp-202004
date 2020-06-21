import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native'

import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import retrieveFavorites from 'nomad-client-logic/retrieve-favorites'
import AsyncStorage from '@react-native-community/async-storage'
import retrieveUser from 'nomad-client-logic/retrieve-user'
import AppTextInput from '../components/NomadTextInput'
import { API_URL } from 'nomad-client-logic/context'
import searchFavorites from 'nomad-client-logic/search-favorites'



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

    const handleSearch = async (query) => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const result = await searchFavorites(token, query)
                setFavorites(result || [])
            } else {
                console.log('error, token not found in homescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }
    useEffect(() => {
        getFavorites()
    }, [])

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
                        onEndEditing={({ nativeEvent: { text } }) => handleSearch(text)}
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
                                image={{ uri: `${API_URL}/workspaces/${item._id}.jpg` }}
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