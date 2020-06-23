import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import { API_URL } from 'nomad-client-logic/context'
import colors from '../styles/colors'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import retrieveUser from 'nomad-client-logic/retrieve-user'

export default function Profile({ handleLogout, navigation }) {
    const [user, setUser] = useState()
    const [image, setImage] = useState()

    const getUser = async () => {
        try {
            const user = await retrieveUser()
            setUser(user)
            setImage({ uri: `${API_URL}/users/${user.id}.jpg` })
        } catch (e) {
            console.log(e) // TODO HANDLE THIS
        }
    }

    useEffect(() => {
        (async () => {
            await getUser()
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {user && <View style={styles.profile}>
                <TouchableOpacity onPress={() => navigation.navigate('UploadProfile')}>
                    <Image source={image} onError={() => setImage(require('../assets/profile.png'))} style={styles.image} />
                </TouchableOpacity>
                <View >
                    <Text style={styles.name}>{user.name}</Text>
                </View>
            </View>}
            <TouchableHighlight onPress={() => navigation.navigate('WorkspaceEditor')} >

                <View style={styles.optionsContainer}>
                    <View style={styles.iconCircle}>
                        <Entypo name="location-pin" size={30} color={colors.primary} />
                    </View>
                    <View >
                        <Text style={styles.name}>Manage Workspaces</Text>
                    </View>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('ManageReviews')} >

                <View style={styles.optionsContainer}>
                    <View style={styles.iconCircle}>
                        < AntDesign name="star" size={30} color={colors.primary} />
                    </View>
                    <View >
                        <Text style={styles.name}>My Reviews</Text>
                    </View>
                </View>
            </TouchableHighlight>
            <View style={styles.logout}>
                <View style={styles.iconCircle}>
                    <AntDesign name="logout" size={30} color={colors.primary} />
                </View>
                <TouchableWithoutFeedback onPress={() => handleLogout()}>
                    <View >
                        <Text style={styles.name}>Sign Out</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f4f4',
        height: '100%',
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
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 10,
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
})