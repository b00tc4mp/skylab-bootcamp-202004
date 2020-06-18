import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal, Button } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';

import AppPicker from '../components/AppPicker'
import AppTextInput from '../components/AppTextInput'

import { searchEscapeRoom, retrieveEscapeIds } from 'escape-me-client-logic'

import Card from '../components/Card'

export default function () {
    const [modalVisible, setModalVisible] = useState(false)
    const [query, setQuery] = useState('')
    const [userLists, setUserLists] = useState()
    const [searched, setSearched] = useState(false)
    const [escapeRooms, setEscapeRooms] = useState([])

    const [difficulty, setDifficulty] = useState()
    const [genre, setGenre] = useState()
    const [ratio, setRatio] = useState()
    const [lessThanPlayersMax, setLessThanPlayersMax] = useState()
    const [lessThanPriceMax, setLessThanPriceMax] = useState()
    const [moreThanPlayersMin, setMoreThanPlayersMin] = useState()
    const [moreThanPriceMin, setMoreThanPriceMin] = useState()

    let escapeList
    useEffect(() => {
        (async () => {
            const { participated = [], pending = [], favorites = [] } = await retrieveEscapeIds()
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
                        let filter = {}

                        if (ratio) filter['moreThanRating'] = ratio.value
                        if (difficulty) filter['difficulty'] = [difficulty.value]
                        if (genre) filter['genre'] = [genre.value]
                        if (moreThanPriceMin) filter['moreThanPriceMin'] = moreThanPriceMin
                        if (lessThanPriceMax) filter['lessThanPriceMax'] = lessThanPriceMax
                        if (moreThanPlayersMin) filter['moreThanPlayersMin'] = moreThanPlayersMin
                        if (lessThanPlayersMax) filter['lessThanPlayersMax'] = lessThanPlayersMax

                        escapeList = await searchEscapeRoom(query, filter)
                        setEscapeRooms(escapeList)
                        setSearched(true)
                    }} />
            </View>
            <View style={styles.buttonContainer}>
                <Modal visible={modalVisible} animationType='slide'>
                    <SafeAreaView>
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                        <View style={styles.modalContainer} >
                            <AppPicker icon="city" placeholder="Difficulty" items={[
                                { label: "Easy", value: 1 },
                                { label: "Medium", value: 2 },
                                { label: "Hard", value: 3 }
                            ]}
                                selectedItem={difficulty} onSelectItem={item => setDifficulty(item)} />
                            <AppPicker style={{ width: '60%', heightt: 30 }} icon="city" placeholder="Genre" items={[
                                { label: "Terror", value: 'terror' },
                                { label: "Adventures", value: 'aventuras' },
                                { label: "Historical", value: 'historico' }
                            ]}
                                selectedItem={genre} onSelectItem={item => setGenre(item)} />
                            <AppPicker style={{ width: '60%', heightt: 30 }} icon="city" placeholder="Ratio" items={[
                                { label: "0 points or above", value: 0 },
                                { label: "1 point or above", value: 1 },
                                { label: "2 points or above", value: 2 },
                                { label: "3 points or above", value: 3 },
                                { label: "4 points or above", value: 4 },
                                { label: "4.5 points or above", value: 4.5 }

                            ]}
                                selectedItem={ratio} onSelectItem={item => setRatio(item)} />


                            <View style={styles.text} >
                                <View style={styles.input}>
                                    <AppTextInput placeholder="Price Max."
                                        autoCapitalize="none"
                                        keyboardType='numeric'
                                        value={lessThanPriceMax ? lessThanPriceMax.toString() : ''}
                                        onChangeText={text => setLessThanPriceMax(Number(text.replace(',', '.')))}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <AppTextInput placeholder="Price Min."
                                        autoCapitalize="none"
                                        keyboardType='numeric'
                                        value={moreThanPriceMin ? moreThanPriceMin.toString() : ''}
                                        onChangeText={text => setMoreThanPriceMin(Number(text.replace(',', '.')))}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <AppTextInput placeholder="Players Min."
                                        autoCapitalize="none"
                                        keyboardType='numeric'
                                        value={moreThanPlayersMin ? moreThanPlayersMin.toString() : ''}
                                        onChangeText={text => setMoreThanPlayersMin(Number(text.replace(',', '.')))}
                                    />
                                </View>
                                <View style={styles.input}>
                                    <AppTextInput placeholder="Players Max."
                                        autoCapitalize="none"
                                        keyboardType='numeric'
                                        value={lessThanPlayersMax ? lessThanPriceMax.toString() : ''}
                                        onChangeText={text => setLessThanPlayersMax(Number(text.replace(',', '.')))}
                                    />
                                </View>

                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>
                <View style={styles.filterButtons} >
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <Text style={styles.buttonText}>Add Filters.</Text>
                    </TouchableOpacity>
                    {<TouchableOpacity style={styles.button} onPress={() => {
                        setDifficulty()
                        setGenre()
                        setRatio()
                        setLessThanPlayersMax()
                        setLessThanPriceMax()
                        setMoreThanPlayersMin()
                        setMoreThanPriceMin()
                    }}>
                        <Text style={styles.buttonText}>Clear Filters.</Text>
                    </TouchableOpacity>}
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
                                    people={`${playersMin}-${playersMax}`}
                                    genre={genre} price={`${priceMin}-${priceMax}€`} image={{ uri: _image }}
                                    participated={userLists.participated.includes(id)}
                                    pending={userLists.pending.includes(id)}
                                    favorites={userLists.favorites.includes(id)}
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
    button: {
        width: '30%',
        backgroundColor: '#fc5c65',
        borderRadius: 30,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
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
    filterButtons: {
        flexDirection: 'row',
        marginBottom: 5
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    container: {
        padding: 20
    },
    modalContainer: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    input: {
        width: '45%',
        marginHorizontal: 5
    }
})