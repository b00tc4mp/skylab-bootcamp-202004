import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight, RefreshControl } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'

import colors from '../styles/colors'
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler'
import NomadTitle from '../components/NomadTitle'
import retrieveUserReviews from 'nomad-client-logic/retrieve-user-reviews'
import AppButton from '../components/Button'
import AsyncStorage from '@react-native-community/async-storage'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import DeleteSwipe from '../components/DeleteSwipe'
import deleteWorkspace from 'nomad-client-logic/delete-workspace'
import retrieveWorkspaces from 'nomad-client-logic/retrieve-workspaces'
import retrieveUserWorkspaces from 'nomad-client-logic/retrieve-user-workspaces'


const image = require('../assets/aitor.jpg')

export default function Profile({ navigation }) {
    const [userReviews, setUserReviews] = useState([])
    const [refresh, setRefresh] = useState(false)


    const manageMyReviews = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (token !== null) {
                const result = await retrieveUserReviews(token)
                debugger
                setUserReviews(result)
            } else {
                console.log('error, token not found in editReviewscreen')
            }
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }
    // const deleteWs = async (wsId) => {
    //     console.log(wsId.toString())
    //     try {
    //         const token = await AsyncStorage.getItem('token')
    //         if (token !== null) {
    //             const result = await deleteWorkspace(token, wsId.toString())
    //             await manageMyReviews()
    //             // setRefresh(true)
    //         } else {
    //             console.log('error, token not found in editReviewscreen')
    //         }
    //     } catch (e) {
    //         console.log(e) // TODO HANDLE THIS
    //     }
    // }



    useEffect(() => {
        manageMyReviews()
    }, [userReviews.length])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <NomadTitle title='My Reviews' />
            </View>
            <View>
                {userReviews && console.log(userReviews) && <FlatList data={userReviews} keyExtractor={(userReviews) => userReviews._id + Math.random()} refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => manageMyReviews()} />}
                    renderItem={({ item }) =>
                        <Swipeable renderRightActions={() => <DeleteSwipe onPress={() => console.log(item._id)} />} >
                            <View style={styles.optionsContainer}>
                                <View style={styles.iconCircle}>
                                    <AntDesign name="star" size={30} color='gold' />
                                </View>
                                <View >
                                    {/* <Text style={styles.name}>{item.stars}</Text> */}
                                    <Text style={styles.review}>{item.text}</Text>
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