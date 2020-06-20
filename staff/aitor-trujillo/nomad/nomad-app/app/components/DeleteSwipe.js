import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

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