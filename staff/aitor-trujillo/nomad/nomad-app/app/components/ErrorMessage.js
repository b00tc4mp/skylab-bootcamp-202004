import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import defaults from '../styles/default'

export default function ErrorMessage({ error, visible }) {
    if (!error) return null
    if (!visible) return null

    return <Text style={[defaults.text, { color: 'red' }]} >{error}</Text>
}

const styles = StyleSheet.create({

})