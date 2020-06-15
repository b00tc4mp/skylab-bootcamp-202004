import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../styles/colors'

export default function AppTextInput({ icon, width, ...props }) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={24} color={colors.secondary} />
            <TextInput placeholder='Email' style={styles.textInput} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.highlight,
        borderRadius: 30,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
        width: '100%',
    },
    textInput: {
        width: '100%',
        marginLeft: 10,
        fontSize: 18,
        // fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir'
    }
})
