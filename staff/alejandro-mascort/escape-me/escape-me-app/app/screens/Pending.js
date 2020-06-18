import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import Card from '../components/Card'
import { retrieveEscapeRooms, retrieveEscapeIds } from 'escape-me-client-logic'

export default function (props) {
    const [escapeRooms, setEscapeRooms] = useState([])
    const [escapes, setEscapes] = useState()

    let escapeList
    useEffect(() => {
        (async () => {
            const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
            setEscapes({ participated, pending, favorites })

            if (!escapeRooms.length) {
                escapeList = await retrieveEscapeRooms('pending')
                setEscapeRooms(escapeList)
            }
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
                    escapeRooms.map(({ id, genre, image: _image, name, playersMax, playersMin, priceMax, priceMin }) => {
                        return (<Card
                            key={id}
                            title={name}
                            rating='4.9'
                            escapeId={id}
                            people={`${playersMin}-${playersMax}`}
                            genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }}
                            participated={escapes.participated.includes(id)}
                            pending={escapes.pending.includes(id)}
                            favorites={escapes.favorites.includes(id)}
                        />)
                    })
                    :
                    <Text></Text>
                }
            </ScrollView>

        </SafeAreaView>
    )
}

