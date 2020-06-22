import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, RefreshControl } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import colors from '../styles/colors'
import { FlatList } from 'react-native-gesture-handler'
import NomadTitle from '../components/NomadTitle'
import AppButton from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import DeleteSwipe from '../components/DeleteSwipe'

import deleteWorkspace from 'nomad-client-logic/delete-workspace'
import retrieveUserWorkspaces from 'nomad-client-logic/retrieve-user-workspaces'

export default function Profile({ navigation }) {
    const [userWorkspaces, setUserWorkspaces] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        retrieveMyWorkspaces()
    }, [userWorkspaces.length])

    const retrieveMyWorkspaces = async () => {
        try {
            const result = await retrieveUserWorkspaces()
            if (result) setUserWorkspaces(result)
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    const deleteWs = async (wsId) => {
        try {
            await deleteWorkspace(wsId.toString())
            return retrieveMyWorkspaces()
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <NomadTitle title='Manage Workspaces' />
                <View style={styles.buttonContainer}>
                    <AppButton title='Create Workspace' bgColor='secondary' txtColor='light' onPress={() => navigation.navigate('CreateWs')} />
                </View>
                <NomadTitle title='My Workspaces' fontSize={26} />
            </View>
            <View>
                {userWorkspaces && <FlatList data={userWorkspaces} keyExtractor={(userWorkspaces) => userWorkspaces._id} refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => retrieveMyWorkspaces()} />}
                    renderItem={({ item }) =>
                        <Swipeable renderRightActions={() => <DeleteSwipe onPress={() => deleteWs(item._id)} />} >
                            <View style={styles.optionsContainer}>
                                <View style={styles.iconCircle}>
                                    <Entypo name="location-pin" size={30} color={colors.primary} />
                                </View>
                                <View >
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.review}>{item.address.street}, {item.address.city}</Text>
                                </View>
                            </View>
                        </Swipeable>
                    } />}
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
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
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