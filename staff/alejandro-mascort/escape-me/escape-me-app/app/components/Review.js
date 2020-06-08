import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ({ username, rating, comment }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>{username}</Text>
                <Text >{rating}</Text>
                <MaterialCommunityIcons name="star" size={24} color="#FFD300" />
            </View>
            <Text>{comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 15,
        padding: 5,
        marginVertical: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    }
})