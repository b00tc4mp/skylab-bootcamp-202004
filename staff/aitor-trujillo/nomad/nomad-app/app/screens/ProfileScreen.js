import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { Entypo, AntDesign } from '@expo/vector-icons'

import colors from '../styles/colors'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


const image = require('../assets/aitor.jpg')

export default function Profile({ handleLogout, navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profile}>
                <Image source={image} style={styles.image} />
                <View >
                    <Text style={styles.name}>Aitor Trujillo</Text>
                    <Text style={styles.review}>Junior Full-Stack Developer</Text>
                </View>
            </View>
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
            <View style={styles.optionsContainer}>
                <View style={styles.iconCircle}>
                    < AntDesign name="star" size={30} color={colors.primary} />
                </View>
                <View >
                    <Text style={styles.name}>My Reviews</Text>
                </View>
            </View>
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