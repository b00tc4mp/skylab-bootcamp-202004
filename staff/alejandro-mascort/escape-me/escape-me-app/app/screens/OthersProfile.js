import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Image
} from "react-native";
import Card from '../components/Card'
import { retrieveEscapeRooms, retrieveUser, retrieveEscapeIds, retrieveFollowingIds, toggleFollowUser } from 'escape-me-client-logic'

import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';

export default function OthersProfile({ _userId, onEscapes }) {
    const [userLists, setUserLists] = useState()
    const [tag, setTag] = useState('favorites')
    const [user, setUser] = useState({})
    const [escapeRooms, setEscapeRooms] = useState([])
    const [followingIds, setFollowingIds] = useState([])

    const handleEscapeLists = async () => {
        const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
        setUserLists({ participated, pending, favorites })
        onEscapes()
    }

    function handleFollowUser(userId) {
        (async () => {
            await toggleFollowUser(userId)
            const followingUsers = await retrieveFollowingIds()
            setFollowingIds(followingUsers)
        })()
    }

    let escapeList
    useEffect(() => {
        (async () => {
            const { name = '', surname = '', username = '' } = await retrieveUser(_userId)
            setUser({ name, surname, username })

            const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
            setUserLists({ participated, pending, favorites })

            escapeList = await retrieveEscapeRooms(tag, _userId)
            setEscapeRooms(escapeList)

            const followingUsers = await retrieveFollowingIds()
            setFollowingIds(followingUsers)
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: '75%' }}>
                <View style={styles.userContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} >
                        <Image style={styles.image} source={require('../assets/tyler.jpg')} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.username}>{user.username}</Text>
                        <Text style={styles.name}>{user.name ? user.name : ''} {user.surname ? user.surname : ''}</Text>
                    </View>
                    {(followingIds.includes(_userId) ?
                        <Feather style={styles.follow} name="user-x" size={24} color="black" onPress={() => handleFollowUser(_userId)} />
                        :
                        <Feather style={styles.follow} name="user-plus" size={24} color="black" onPress={() => handleFollowUser(_userId)} />)
                    }
                </View>
                <View style={styles.details}>
                    <TouchableOpacity style={tag === 'favorites' ? [styles.pair, styles.selected] : styles.pair} onPress={async () => {
                        escapeList = await retrieveEscapeRooms('favorites', _userId)
                        setEscapeRooms(escapeList)
                        setTag('favorites')
                    }}>
                        <FontAwesome name="heart" size={24} color={'#fc5c65'} />
                        <Text>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tag === 'participated' ? [styles.pair, styles.selected] : styles.pair} onPress={async () => {
                        escapeList = await retrieveEscapeRooms('participated', _userId)
                        setEscapeRooms(escapeList)
                        setTag('participated')
                    }}>
                        <MaterialIcons name="done-all" size={24} color="black" />
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
                {
                    escapeRooms.length ?
                        escapeRooms.map(({ id, genre, image: _image, name, playersMax, playersMin, priceMax, priceMin }) => {
                            return (<Card
                                key={id}
                                title={name}
                                rating='4.9'
                                escapeId={id}
                                people={`${playersMin}-${playersMax}`}
                                genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }}
                                participated={userLists.participated.includes(id)}
                                pending={userLists.pending.includes(id)}
                                favorites={userLists.favorites.includes(id)}
                                onEscapes={handleEscapeLists}
                            />)
                        })
                        :
                        <Text>No escape rooms added yet.</Text>
                }
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        alignItems: 'center',
        backgroundColor: '#f8f4f4',
        paddingTop: 30,
        width: '100%'
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    details: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    edit: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fc5c65',
        padding: 10,
        borderRadius: 20
    },
    pair: {
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 20,
        borderWidth: 5,
        padding: 10,
        borderColor: '#4ecdc4'
    },
    selected: {
        borderColor: '#fc5c65'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    containerItem: {
        borderRadius: 50,
        backgroundColor: 'white'
    },
    follow: {
        position: 'absolute',
        right: 20
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10
    },
    name: {
        fontSize: 16
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold'
    }
});