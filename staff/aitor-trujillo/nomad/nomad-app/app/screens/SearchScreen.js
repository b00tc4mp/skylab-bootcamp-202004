import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import retrieveUser from 'nomad-client-logic/retrieve-user'
import AppTextInput from '../components/NomadTextInput'
import { API_URL } from 'nomad-client-logic/context'
import searchWorkspaces from 'nomad-client-logic/search-workspaces'

export default function Search({ navigation }) {
    const [workspaces, setWorkspaces] = useState([])
    const [user, setUser] = useState()
    const [refresh, setRefresh] = useState(false)

    const handleSearch = async (query) => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const user = await retrieveUser(token)
                setUser(user)
                const result = await searchWorkspaces(token, query)
                setWorkspaces(result)
            } else {
                console.log('error, token not found in homescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}></View>
            <NomadHeader
                title="Search"
                subTitle="Search by name, city, country... 🧐"
                onPress={() => navigation.navigate('Profile')}
            />
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => setWorkspaces([])} />}>
                <View style={styles.containerSearch}>
                    <AppTextInput
                        icon='magnify'
                        placeholder='Search workspaces'
                        maxLength={100}
                        autoCorrect={false}
                        keyboardType={Platform.OS === 'ios' ? 'web-search' : 'default'}
                        autoFocus
                        onEndEditing={({ nativeEvent: { text } }) => handleSearch(text)}
                    />
                </View>
                <View style={styles.containerCards}>
                    {workspaces && <FlatList data={workspaces} keyExtractor={(workspace) => workspace.name + Math.random().toString()}
                        renderItem={({ item }) =>
                            <Card
                                title={item.name}
                                address={`${item.address.street}, ${item.address.city}`}
                                rating={item.score}
                                price={`${item.price.amount}€ / ${item.price.term}`}
                                image={{ uri: `${API_URL}/workspaces/${item._id}.jpg` } || require('../assets/default.jpg')}
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