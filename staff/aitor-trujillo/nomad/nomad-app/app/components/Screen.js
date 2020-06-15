import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'

export default function Screen(props) {
    return (
        <SafeAreaView style={styles.screen}>
            {props.children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight
    }
})
