import React from 'react';
import { StyleSheet, Text } from 'react-native'




const Header = function({ text, onPress, bgColor }) {

    return (
        <View style={styles.header}>

        </View>

    )
}

export default Header

const styles = StyleSheet.create({
    buttonForm: {
        justifyContent: 'center',
        backgroundColor: '#009965',

        width: '100%',
        height: 60,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30

    }


})