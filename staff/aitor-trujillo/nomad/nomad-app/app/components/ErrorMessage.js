import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import defaults from '../styles/default'

export default function ErrorMessage({ error }) {
    if (error) return null

    return (
        <View>
            <Text style={[defaults.text, { color: 'red' }]} >{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})