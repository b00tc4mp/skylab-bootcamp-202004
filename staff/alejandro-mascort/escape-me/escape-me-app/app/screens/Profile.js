import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import { useRoute } from '@react-navigation/native'
import UserItem from '../components/UserItem'
import Card from '../components/Card'
import { retrieveEscapeRooms, retrieveUser, retrieveFollowing, retrieveEscapeIds, retrieveFollowingIds } from 'escape-me-client-logic'

import { Entypo, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const route = useRoute()
    const token = route.params['token']

    const [userLists, setUserLists] = useState()
    const [followingIds, setFollowingIds] = useState()
    const [tag, setTag] = useState('favorites')
    const [user, setUser] = useState({})
    const [following, setFollowing] = useState([])
    const [escapeRooms, setEscapeRooms] = useState([])

    let escapeList, follow
    useEffect(() => {
        (async () => {
            if (!user.username) {
                const { name = '', surname = '', username = '' } = await retrieveUser(token)

                setUser({ name, surname, username })
            }

            const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds(token)
            setUserLists({ participated, pending, favorites })

            const { followingIds = [] } = await retrieveFollowingIds(token)
            setFollowingIds(followingIds)

            if (tag !== '') {

                escapeList = await retrieveEscapeRooms(token, tag)
                setEscapeRooms(escapeList)
            }
            else {
                follow = await retrieveFollowing(token)
                setFollowing(follow)
            }
        })()
    }, [userLists])

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView >
                <UserItem name={user.name ? user.name : ''} surname={user.surname ? user.surname : ''} email={`@${user.username}`} image={require('../assets/tyler.jpg')} main={true} />
                <TouchableOpacity style={styles.edit}>
                    <Entypo name="pencil" size={30} color="white" />
                    <Text style={styles.text}>Edit profile</Text>
                </TouchableOpacity>
                <View style={styles.details}>
                    <TouchableOpacity style={tag === 'favorites' ? [styles.pair, styles.selected] : styles.pair} onPress={() => setTag('favorites')}>
                        <FontAwesome name="heart" size={24} color={'#fc5c65'} />
                        <Text>Favorite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tag === 'participated' ? [styles.pair, styles.selected] : styles.pair} onPress={() => setTag('participated')}>
                        <MaterialIcons name="done-all" size={24} color="black" />
                        <Text>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tag === '' ? [styles.pair, styles.selected] : styles.pair} onPress={() => setTag('')}>
                        <Ionicons name="md-contacts" size={24} color="black" />
                        <Text>Following</Text>
                    </TouchableOpacity>
                </View>
                {
                    tag !== '' ?

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
                        following.length ?
                            following.map(({ name, surname, username, id }) => {
                                return (<UserItem key={id}
                                    name={name ? name : ''}
                                    surname={surname ? surname : ''}
                                    email={`@${username}`}
                                    image={require('../assets/tyler.jpg')}
                                    following={followingIds.includes(id)}
                                    userId={id}
                                    token={token}
                                />)
                            })
                            :
                            <Text>You're not following people yet.</Text>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        backgroundColor: '#f8f4f4',
        paddingTop: 30
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
    }
});