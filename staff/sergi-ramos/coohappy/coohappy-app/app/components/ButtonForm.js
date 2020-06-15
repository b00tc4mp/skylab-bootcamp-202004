import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native'




const ButtonForm = function({text, buttonAction, bgColor})  {

    return (

        <TouchableOpacity onPress={buttonAction}  activeOpacity={0.9} style={[styles.buttonForm, {backgroundColor: bgColor}]} >
            <Text style={{ color: 'white', fontWeight: '700', width: '100%', textAlign: 'center'  }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonForm

const styles = StyleSheet.create({
    buttonForm: {
        justifyContent: 'center',
        backgroundColor: '#009965',
        width: '100%',
        height: 55,
        borderRadius: 5

    }


})