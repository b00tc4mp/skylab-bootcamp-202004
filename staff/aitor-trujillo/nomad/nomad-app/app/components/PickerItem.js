import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import defaults from '../styles/default'
import colors from '../styles/colors'

export default function PickerItem({ label, icon, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name={icon} size={24} color={colors.secondary} />
            <Text style={[defaults.text, styles.text]} >{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        marginLeft: 30,
        fontSize: 24,
        marginTop: 20
    }
})
