import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../styles/colors'

export default ({ title, bgColor = 'primary', txtColor = 'light', onPress }) => {

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[bgColor] }]} onPress={onPress}>
            <Text style={[styles.text, { color: colors[txtColor] }]}>{title}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        padding: 18,
        backgroundColor: colors.primary,
        borderRadius: 40,
        marginVertical: 10
    },
    text: {
        color: colors.light,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'

    }
})
