import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ message, color = 'black', fontSize = 20 }) => {

    return (
        <View style={styles.container}>
            <Text style={{ color, fontSize }} >{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginVertical: 15,
        alignItems: 'center'
    }
})