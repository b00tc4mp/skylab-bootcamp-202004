import React from 'react';
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const ButtonForm = function({text, buttonAction, bgColor})  {

    return (

        <TouchableOpacity onPress={buttonAction}  activeOpacity={0.9} style={[styles.buttonForm, {backgroundColor: bgColor}]} >
            <Text style={{ color: 'white', fontWeight: '700', width: '100%', textAlign: 'center'  }}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ButtonForm

