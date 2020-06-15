import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';

import { SearchBar } from 'react-native-elements';
import { searchEscapeRoom, retrieveUser } from 'escape-me-client-logic'

import Card from '../components/Card'

export default function () {
    const route = useRoute()
    const token = route.params['token']

    const [query, setQuery] = useState('')
    const [userLists, setUserLists] = useState()
    const [searched, setSearched] = useState(false)
    const [escapeRooms, setEscapeRooms] = useState([])
    const [filter, setFilter] = useState({})

    let escapeList
    useEffect(() => {
        (async () => {
            const { participated = [], pending = [], favorites = [] } = await retrieveUser(token)
            setUserLists({ participated, pending, favorites })
        })()
    }, [userLists, escapeRooms])

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <SearchBar
                    searchIcon={false}
                    containerStyle={styles.bar}
                    inputContainerStyle={styles.inputContainer}
                    placeholder="Search Escape Rooms"
                    onChangeText={text => {
                        setQuery(text)
                    }}
                    value={query}
                    platform="ios"
                />
                <AntDesign name="search1" size={26} color={'black'}
                    onPress={async () => {
                        escapeList = await searchEscapeRoom(query, filter)
                        setEscapeRooms(escapeList)
                        setSearched(true)
                    }} />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Add filters.</Text>
                </View>
            </View>
            <ScrollView >
                {
                    searched ?
                        escapeRooms.length ?
                            escapeRooms.map(({ city, id, genre, image: _image, name, playersMax, playersMin, priceMax, priceMin }) => {
                                return (<Card
                                    key={id}
                                    title={name}
                                    rating='4.9'
                                    escapeId={id}
                                    token={token}
                                    people={`${playersMin}-${playersMax}`}
                                    genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }}
                                    participated={userLists.participated.includes(id)}
                                    pending={userLists.pending.includes(id)}
                                    favorites={userLists.favorites.includes(id)}
                                />)
                            })
                            :
                            <Text>No escape rooms added yet.</Text>
                        :
                        <View />
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    bar: {
        height: 30,
        width: '90%',
        marginBottom: 10
    },
    button: {
        width: '30%',
        backgroundColor: '#fc5c65',
        borderRadius: 30,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    inputContainer: {
        height: 20,
        borderRadius: 50,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    container: {
        padding: 20
    }
})