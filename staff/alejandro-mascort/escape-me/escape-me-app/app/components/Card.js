import React from 'react'
{/* <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image="../assets/whitechapel.jpg" /> */ }
import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons'
import AppLoading, { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading'
function Card({ title, rating, people, genre, price, image }) {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>{title}</Text>
                <SimpleLineIcons name="heart" size={24} color="tomato" style={styles.icon} />
                <MaterialIcons name="check-box-outline-blank" size={24} color="black" style={styles.icon} />
                <Entypo name="add-to-list" size={24} color="black" style={styles.icon} />
            </View>
            <TouchableOpacity activeOpacity={0.8}>
                <ImageBackground style={styles.image} source={image} resizeMode={'contain'} />
            </TouchableOpacity>
            <View style={styles.info}>
                <View style={styles.pair}>
                    <Text style={styles.text}>{rating}</Text>
                    <MaterialCommunityIcons name="star" size={24} color="yellow" />
                </View>
                <View style={styles.pair}>
                    <Text style={styles.text}>{people}</Text>
                    <MaterialIcons name="people" size={24} color="black" />
                </View>
                <Text style={styles.text}>{price}</Text>
                <Text style={styles.text}>{genre}</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    image: {
        width: '100%',
        height: 200,
    },
    icon: {
        marginHorizontal: 5
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    pair: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rating: {
        position: "absolute",
        bottom: 5,
        left: 5
    },
    text: {
        fontSize: 18
    },
    title: {
        position: "absolute",
        top: 5,
        left: 5
    }
})

export default Card