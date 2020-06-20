import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import Card from '../components/Card'
import { retrieveEscapeRooms, retrieveEscapeIds } from 'escape-me-client-logic'

export default function (props) {
    const [escapeRooms, setEscapeRooms] = useState([])
    const [escapes, setEscapes] = useState()

    const handleEscapeLists = async () => {
        const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
        setEscapes({ participated, pending, favorites })
    }

    let escapeList
    useEffect(() => {
        (async () => {
            const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
            setEscapes({ participated, pending, favorites })

            escapeList = await retrieveEscapeRooms('pending')
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
                    escapeRooms.map(({ id, genre, image: _image, name, playersMax, playersMin, priceMax, priceMin, rating }) => {
                        return (<Card
                            key={id}
                            title={name}
                            rating={rating}
                            escapeId={id}
                            people={`${playersMin}-${playersMax}`}
                            genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }}
                            participated={escapes.participated.includes(id)}
                            pending={escapes.pending.includes(id)}
                            favorites={escapes.favorites.includes(id)}
                            onEscapes={handleEscapeLists}
                        />)
                    })
                    :
                    <Text></Text>
                }
            </ScrollView>

        </SafeAreaView>
    )
}

