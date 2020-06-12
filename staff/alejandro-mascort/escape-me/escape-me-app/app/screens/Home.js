import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Card from '../components/Card'
import { retrieveEscapeRooms } from 'escape-me-client-logic'

export default function (props) {
    const route = useRoute()
    const token = route.params['token']
    const [escapeRooms, setEscapeRooms] = useState([])

    let escapeList
    useEffect(() => {
        (async () => {
            escapeList = await retrieveEscapeRooms(token, 'pending')
            setEscapeRooms(escapeList)
        })()
    }, [])

    return (
        <SafeAreaView style={{
            backgroundColor: '#f8f4f4',
            padding: 10,
            paddingTop: 30,
        }}>
            <ScrollView>
                {escapeRooms.length ?
                    escapeRooms.map(({ city, id, genre, image: _image, name, playersMax, playersMin, priceMax, priceMin }) => {
                        return (<Card key={id} title={name} rating='4.9' people={`${playersMin}-${playersMax}`} genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }} />)
                    })
                    :
                    <Text>Nothing to suggest</Text>
                }
            </ScrollView>

        </SafeAreaView>
    )
}

