import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Platform, ScrollView, Image, ImageBackground } from 'react-native'
import * as Permissions from 'expo-permissions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as Location from "expo-location";

import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import WorkspacePage from './WorkspacePage'
import AppTextInput from '../components/NomadTextInput'
import NomadTitle from '../components/NomadTitle'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import retrieveWorkspaces from 'nomad-client-logic/retrieve-workspaces'
import AsyncStorage from '@react-native-community/async-storage'




export default function Home({ navigation }) {
    const [workspaces, setWorkspaces] = useState(undefined)

    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (!result.granted) alert('I need to access location to perform well :(')
    }

    const getLocationWorkspaces = async (location) => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const result = await retrieveWorkspaces(token, location)
                setWorkspaces(result)
            } else {
                console.log('error, token not found in homescreen') // TODO
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    useEffect(() => {
        (async () => {
            await getPermissions()
            const { coords: { latitude, longitude } } = await Location.getLastKnownPositionAsync()
            await getLocationWorkspaces({ latitude, longitude })
        })()
    }, [])


    const _workspaces = [
        {
            title: 'WeWork Barcelona',
            address: '23 st, Barcelona',
            rating: '5',
            price: '99€ / month',
            description: 'This is the best known cowork out there. Remember that. When you think in procrastinate come here.',
            image: require('../assets/cowork.jpg'),
        },
        {
            title: 'Happy Coders',
            address: 'Rambla 12, Barcelona',
            rating: '4',
            price: '10€ / day',
            image: require('../assets/happycoders.jpg'),
        }
    ]


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <NomadHeader
                    title="Hi, Aitor!"
                    subTitle="Find your next workspace 🌴"
                    imageSource={require('../assets/aitor.jpg')}
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
            <ScrollView>
                <View style={styles.containerSearch}>
                    <AppTextInput
                        icon='magnify'
                        placeholder='Search workspace'
                        maxLength={100}
                        autoCorrect={false}
                        keyboardType={Platform.OS === 'ios' ? 'web-search' : 'default'}
                        textContentType='organizationName'
                        onChangeText={(value) => console.log(value)}
                    // onBlur={() => setFieldTouched('workspaceName')}
                    />
                    <NomadTitle title='Categories' />
                    <View style={styles.categoryContainer} >
                        <TouchableOpacity style={styles.categoryButton} onPress={() => console.log('category cowork')} >
                            < Image source={require('../assets/cat-cowork.png')} style={styles.category} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton} >
                            < Image source={require('../assets/cat-coffee.png')} style={styles.category} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.categoryContainer} >
                        <TouchableOpacity style={styles.categoryButton} >
                            < Image source={require('../assets/cat-library.png')} style={styles.category} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton} >
                            < Image source={require('../assets/cat-shared.png')} style={styles.category} />
                        </TouchableOpacity>
                    </View>


                    <NomadTitle title='Popular near you' />
                </View>
                <View style={styles.containerCards}>
                    <FlatList data={workspaces} keyExtractor={(workspace) => workspace._id}
                        renderItem={({ item }) =>
                            <Card
                                title={item.name}
                                address={`${item.address.street}, ${item.address.city}`}
                                rating={item.score}
                                price={`${item.price.amount}€ / ${item.price.term}`}
                                image={item.photos[0] || require('../assets/default.jpg')}
                                onPress={() => navigation.navigate('WorkspacePage', item)}
                            />
                        } />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        overflow: 'hidden'
    },
    containerHeader: {
        paddingTop: 40,
    },
    containerSearch: {
        paddingHorizontal: 20
    },
    categoryContainer: {
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10

    },
    category: {
        width: 160,
        borderRadius: 25,
        height: 80,

    },
    categoryButton: {
        width: '50%'
    },
    categoryText: {
        paddingHorizontal: '50%',
        fontSize: 24,
        color: colors.light
    },
    containerCards: {
        height: '100%',
        padding: 20,
        shadowOpacity: 0.6
    },
})