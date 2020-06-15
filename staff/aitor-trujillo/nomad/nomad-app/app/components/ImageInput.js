import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Alert, TouchableWithoutFeedback } from 'react-native'
import colors from '../styles/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default function ImageInput({ imageUri, handleImage }) {

    // const [imageUri, setImageUri] = useState()

    const getPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (!result.granted) alert('I need to access location to perform well :(')
    }

    useEffect(() => {
        getPermissions()
    }, [])

    const handlePress = () => {
        imageUri ?
            Alert.alert('Remove Image', 'Do you want to remove image?', [{ text: 'Proceed', onPress: () => handleImage(null) }, { text: 'Nope' }])
            : getImage()
    }


    const getImage = async () => {
        try {
            const getImage = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: false,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            })
            if (!getImage.cancelled) handleImage(getImage)
        } catch (error) {
            console.log('something went wrong', error)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container} >
                {!imageUri && <MaterialCommunityIcons name='camera' size={24} color={colors.secondary} />}
                {imageUri && <Image style={styles.image} source={imageUri} />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.highlight,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',

    }
})
