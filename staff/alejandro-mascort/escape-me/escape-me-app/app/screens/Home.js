import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import Card from '../components/Card'
import { suggestEscapeRooms, retrieveEscapeIds } from 'escape-me-client-logic'

export default function (props) {
    const [escapeRooms, setEscapeRooms] = useState([])
    const [escapes, setEscapes] = useState()

    console.log('state: ', props.navigation.state)
    const handleEscapeLists = async () => {
        const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
        setEscapes({ participated, pending, favorites })
    }

    let escapeList
    useEffect(() => {
        console.log('state: ', props.navigation.state);
        (async () => {
            const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
            setEscapes({ participated, pending, favorites })

            escapeList = await suggestEscapeRooms()
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

