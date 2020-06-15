import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';

import { SearchBar } from 'react-native-elements';
import { searchUsers, retrieveUser } from 'escape-me-client-logic'

import UserItem from '../components/UserItem'

export default function () {
    const route = useRoute()
    const token = route.params['token']

    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const [following, setFollowing] = useState()
    const [searched, setSearched] = useState(false)

    let _users
    useEffect(() => {
        (async () => {
            const { following = [] } = await retrieveUser(token)
            setFollowing(following)
        })()
    }, [users, following])

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <SearchBar
                    searchIcon={false}
                    containerStyle={styles.bar}
                    inputContainerStyle={styles.inputContainer}
                    placeholder="Search Users"
                    onChangeText={text => {
                        setQuery(text)
                    }}
                    value={query}
                    platform="ios"
                />
                <AntDesign name="search1" size={26} color={'black'}
                    onPress={async () => {
                        _users = await searchUsers(token, query)
                        setUsers(_users)
                        setSearched(true)
                    }} />
            </View>
            <ScrollView >
                {
                    searched ?
                        users.length ?
                            users.map(({ name, surname, username, id }) => {
                                return (<UserItem key={id}
                                    name={name ? name : ''}
                                    surname={surname ? surname : ''}
                                    email={`@${username}`}
                                    image={require('../assets/tyler.jpg')}
                                    following={following.includes(id)}
                                    userId={id}
                                    token={token}
                                />)
                            })
                            :
                            <Text>No results found.</Text>
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