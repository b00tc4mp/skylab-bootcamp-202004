import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import { HeaderHome } from '.'

module.exports = ({ navigation }) => {

    return (

        <View style={styles.container}>

<HeaderHome />

        

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        flex: 0.2,
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