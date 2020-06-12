import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import colors from '../styles/colors'

export default ({ title, address, image, price, rating }) => {
    return (

        <View style={styles.cardContainer}>
            <Image source={image} style={styles.image} />
            <View style={styles.txtContainer} >
                <View style={styles.ratingSeparator}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.rating}>{rating}< AntDesign name="star" size={24} color="gold" /></Text>
                </View>
                <Text style={styles.address}>{address}</Text>
                <Text style={styles.price}>{price}</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.light,
        borderRadius: 15,
        width: '100%',
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#1c1c1c',
        shadowRadius: 0.5
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
        // fontWeight: 'bold',
        textAlign: 'left',
        fontWeight: 'bold',
        width: '100%',


    },
    rating: {
        color: colors.dark,
        fontSize: 24,
        // fontWeight: 'bold',

    },
    ratingSeparator: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

{/* <Card
title='WeWork Barcelona'
address='23 st, Barcelona'
rating='5'
price='99€ / month'
image={require('./app/assets/background.jpg')}
/> */}
