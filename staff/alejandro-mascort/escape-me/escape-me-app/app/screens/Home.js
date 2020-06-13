import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Card from '../components/Card'
import { retrieveEscapeRooms, retrieveUser } from 'escape-me-client-logic'

export default function (props) {
    const route = useRoute()
    const token = route.params['token']
    const [escapeRooms, setEscapeRooms] = useState([])
    const [escapes, setEscapes] = useState()

    let escapeList
    useEffect(() => {
        (async () => {
            const { participated = [], pending = [], favorites = [] } = await retrieveUser(token)
            setEscapes({ participated, pending, favorites })

            escapeList = await retrieveEscapeRooms(token, 'pending')
            setEscapeRooms(escapeList)
        })()
    }, [escapes])

    return (
        <SafeAreaView style={{
            backgroundColor: '#f8f4f4',
            padding: 10,
            paddingTop: 30,
        }}>
            <ScrollView>
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
    )
}

