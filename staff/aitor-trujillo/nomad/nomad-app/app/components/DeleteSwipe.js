import React from 'react'
import { View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default ({ onPress }) => {

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="trash-can" size={32} color='white' onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'tomato',
        width: 70,
        justifyContent: 'center',
        marginTop: 2,
        alignItems: 'center'
    }
})