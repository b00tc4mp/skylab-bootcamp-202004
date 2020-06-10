import React from 'react'
import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo } from '@expo/vector-icons'
const styles = require('./style')

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

export default Card