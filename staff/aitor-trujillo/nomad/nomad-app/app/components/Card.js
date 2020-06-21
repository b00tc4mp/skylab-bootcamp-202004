import React from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import colors from '../styles/colors'

export default ({ title, address, image, price, rating, onPress, width = '100%', marginRight, imgHeight = 200 }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} >
            <View style={[styles.cardContainer, { width, marginRight }]}>
                <Image source={image} style={[styles.image, { height: imgHeight }]} />
                <View style={styles.txtContainer} >
                    <View style={styles.ratingSeparator}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.rating}>{rating}< AntDesign name="star" size={24} color="gold" /></Text>
                    </View>
                    <Text style={styles.address}>{address}</Text>
                    <Text style={styles.price}>{price}</Text>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.light,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    txtContainer: {
        padding: 15,
        backgroundColor: colors.light,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
        width: '100%'
    },
    title: {
        color: colors.dark,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    price: {
        color: 'grey',
        textAlign: 'left',
        fontWeight: 'bold',
        width: '100%',
    },
    rating: {
        color: colors.dark,
        fontSize: 24,
    },
    ratingSeparator: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
