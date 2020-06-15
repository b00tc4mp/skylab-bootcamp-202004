import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, Platform, ScrollView } from 'react-native'
import * as Permissions from 'expo-permissions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import NomadHeader from '../components/NomadHeader'
import Card from '../components/Card'
import WorkspacePage from './WorkspacePage'
import AppTextInput from '../components/AppTextInput'
import NomadTitle from '../components/NomadTitle'




export default function Home({ navigation }) {
    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (!result.granted) alert('I need to access location to perform well :(')
    }

    useEffect(() => {
        getPermissions()
    }, [])


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
                    <NomadTitle title='Popular near you' />
                </View>
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
        flex: 1,
        overflow: 'hidden'
    },
    containerHeader: {
        paddingTop: 40,
    },
    containerSearch: {
        paddingHorizontal: 20
    },
    containerCards: {
        height: '100%',
        padding: 20,
        shadowOpacity: 0.6
    },
})