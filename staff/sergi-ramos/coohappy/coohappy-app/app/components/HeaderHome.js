import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import SvgUri from 'expo-svg-uri'

const HeaderHome = function ({user, surname}) {
    //const [name, setName] = useState
    //const [surname, setSurname] = useState

    //setName(user)
    //setSurname(user.surname)
    return (

        <View style={styles.header}>
            <SvgUri style={styles.houseIcon} source={require('../assets/ic-house.svg')} />
            <Text style={styles.titleText}>{user} {surname} </Text>
            <TouchableOpacity activeOpacity={0.8}>
            <SvgUri onPr style={styles.userIcon} source={require('../assets/ic-user.svg') } />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderHome

const styles = StyleSheet.create({
    header: {
        height: 135,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: '#069b69',
    },
    titleText: {
        color: '#ffd545',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginRight: 50,
        width: 200
    },
    houseIcon: {
        marginBottom: 15,
        marginLeft: 20
    },

    userIcon: {
        marginBottom: 20,
        marginRight: 20
    }


})