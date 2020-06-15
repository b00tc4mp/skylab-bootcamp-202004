import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function NomadTitle({ title, fontSize = 28 }) {
    return (
        <Text style={[styles.titleStyle, { fontSize: fontSize }]} >{title}</Text>
    )
}

const styles = StyleSheet.create({
    titleStyle: {
        fontWeight: "bold",
        lineHeight: 41,
    }
})
