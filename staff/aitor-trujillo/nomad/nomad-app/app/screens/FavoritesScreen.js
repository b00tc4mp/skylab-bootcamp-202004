import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from 'react-native'
import * as Permissions from 'expo-permissions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import WorkspacePage from './WorkspacePage'




export default function Favorites({ navigation }) {
    // const getPermissions = async () => {
    //     const result = await Permissions.askAsync(Permissions.LOCATION)
    //     if (!result.granted) alert('I need to access location to perform well :(')
    // }

    // useEffect(() => {
    //     getPermissions()
    // }, [])


    const workspaces = [
        {
            title: 'WeWork Barcelona',
            address: '23 st, Barcelona',
            rating: '5',
            price: '99€ / month',
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
            <View style={styles.containerHeader}></View>
            <NomadHeader
                title="Favorites"
                subTitle="Come back to loved workspaces ❤️"
                imageSource={require('../assets/aitor.jpg')}
                onPress={() => navigation.navigate('Profile')}
            />
            <ScrollView>
                <View style={styles.containerCards}>
                    <FlatList data={workspaces} keyExtractor={(workspace) => workspace.title}
                        renderItem={({ item }) =>
                            <Card
                                title={item.title}
                                address={item.address}
                                rating={item.rating}
                                price={item.price}
                                image={item.image}
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
        flex: 1
    },
    containerHeader: {
        padding: 20,
    },
    containerCards: {
        height: '100%',
        padding: 20,
        shadowOpacity: 0.5
    },
})