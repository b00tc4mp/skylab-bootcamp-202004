import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function NomadTitle({ title, fontSize = 28, color = 'black' }) {
    return (
        <Text style={[styles.titleStyle, { fontSize, color }]} >{title}</Text>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontWeight: "bold",
        lineHeight: 41,
    }
})
