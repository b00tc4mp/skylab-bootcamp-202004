import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'

import colors from '../styles/colors'
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler'
import NomadTitle from '../components/NomadTitle'
import retrieveUserWorkspaces from 'nomad-client-logic/retrieve-user-workspaces'
import AppButton from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage'


const image = require('../assets/aitor.jpg')

export default function Profile({ navigation }) {
    const [userWorkspaces, setUserWorkspaces] = useState(null)


    const retrieveMyWorkspaces = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const result = await retrieveUserWorkspaces(token)
                setUserWorkspaces(result)
            } else {
                console.log('error, token not found in editworkspacescreen')
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }



    useEffect(() => {
        retrieveMyWorkspaces()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <NomadTitle title='Manage Workspaces' />
                <View style={styles.buttonContainer}>
                    <AppButton title='Create Workspace' bgColor='secondary' txtColor='light' onPress={() => navigation.navigate('CreateWs')} />
                </View>
                <NomadTitle title='My Workspaces' />
            </View>
            <View>
                <FlatList data={userWorkspaces} keyExtractor={(userWorkspaces) => userWorkspaces.id}
                    renderItem={({ item }) =>
                        <TouchableHighlight onPress={() => console.log('manageworkspace clicked')} >

                            <View style={styles.optionsContainer}>
                                <View style={styles.iconCircle}>
                                    <Entypo name="location-pin" size={30} color={colors.primary} />
                                </View>
                                <View >
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.name}>{item.address.street}, {item.address.city}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    } />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f4f4',
        height: '100%',
    },
    headerContainer: {
        marginTop: 15,
        paddingHorizontal: 20,
        // alignItems: 'center'
    },
    buttonContainer: {
        // paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 20,
    },
    profile: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30,
        alignSelf: "center",
        width: '100%',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.light,
        alignItems: 'center',
    },
    logout: {
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: "center",
        width: '100%',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.light,
        alignItems: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        marginTop: 2,
        alignSelf: "center",
        width: '100%',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.light,
        alignItems: 'center',
    },
    containerHeader: {
        padding: 20,
    },
    containerCards: {
        height: '100%',
        padding: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 10
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: colors.dark,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5
    },
    review: {
        color: 'grey',
        fontWeight: 'bold',
    }
})