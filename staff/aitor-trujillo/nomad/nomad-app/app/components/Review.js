import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import colors from '../styles/colors'

export default function Review({ image, name, surname, stars, review }) {

    const convertNumToStars = (num) => {
        switch (num) {
            case 0:
                return (<>< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" /></>)
                break;
            case 1:
                return (<>< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" /></>)
                break;
            case 2:
                return (<>< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" /></>)
                break;
            case 3:
                return (<>< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="grey" />< AntDesign name="star" size={24} color="grey" /></>)
                break;
            case 4:
                return (<>< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="grey" /></>)
                break;
            case 5:
                return (<>< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" />< AntDesign name="star" size={24} color="gold" /></>)
                break;

            default:
                break;
        }
    }

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <View >
                <Text style={styles.name}>{name} {surname} - {convertNumToStars(stars)}</Text>
                <Text style={styles.review}>{review}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        alignSelf: "center",
        width: '100%'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 10
    },
    name: {
        color: colors.dark,
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 5
    },
    review: {
        width: 270,
        color: colors.dark,
    }
})

//     < Review
// image = { require('./app/assets/aitor.jpg') }
// name = 'Aitor Truji'
// stars = { 3}
// review = "The best place i've ever procrastinated. Nothing more to tell."
//     />