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
import { retrieveEscapeRooms, retrieveUser } from 'escape-me-client-logic'

import { Entypo, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const route = useRoute()
    const token = route.params['token']
    const [escapeRooms, setEscapeRooms] = useState([])
    const [tag, setTag] = useState('favorites')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [escapes, setEscapes] = useState()

    let escapeList
    useEffect(() => {
        (async () => {
            if (!username) {
                const { name: _name, surname: _surname, username: _username } = await retrieveUser(token)

                _name && setName(_name)
                _surname && setSurname(_surname)
                _username && setUsername(_username)
            }

            const { participated = [], pending = [], favorites = [] } = await retrieveUser(token)
            setEscapes({ participated, pending, favorites })

            escapeList = await retrieveEscapeRooms(token, tag)
            setEscapeRooms(escapeList)
        })()
    }, [escapes])

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView >
                <UserItem name={name ? name : ''} surname={surname ? surname : ''} email={`@${username}`} image={require('../assets/tyler.jpg')} />
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
                    <TouchableOpacity style={styles.pair}>
                        <Ionicons name="md-contacts" size={24} color="black" />
                        <Text>Following</Text>
                    </TouchableOpacity>
                </View>
                {escapeRooms.length ?
                    escapeRooms.map(({ city, id, genre, image: _image, name, playersMax, playersMin, priceMax, priceMin }) => {
                        return (<Card
                            key={id}
                            title={name}
                            rating='4.9'
                            escapeId={id}
                            token={token}
                            people={`${playersMin}-${playersMax}`}
                            genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }}
                            participated={escapes.participated.includes(id)}
                            pending={escapes.pending.includes(id)}
                            favorites={escapes.favorites.includes(id)}
                        />)
                    })
                    :
                    <Text>No escape rooms added yet.</Text>
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