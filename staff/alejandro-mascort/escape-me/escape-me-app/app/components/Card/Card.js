import React from 'react'
import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, AntDesign, Feather, Foundation } from '@expo/vector-icons'
import { toggleEscapeRoom } from 'escape-me-client-logic'
const styles = require('./style')

function Card({ title, rating, people, genre, price, image, participated, pending, favorites, token, escapeId }) {
    function handleToggle(tag) {
        (async () => toggleEscapeRoom(token, escapeId, tag))()
    }

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={[styles.text, styles.title]}>{title}</Text>
                {favorites ? <AntDesign name="heart" size={24}
                    color="tomato" style={styles.icon} onPress={() => handleToggle('favorites')} />
                    :
                    <SimpleLineIcons name="heart" size={24}
                        color="tomato" style={styles.icon} onPress={() => handleToggle('favorites')} />}
                {participated ? <Feather name="check-square" size={24}
                    color="black" style={styles.icon} onPress={() => handleToggle('participated')} />
                    :
                    <MaterialIcons name="check-box-outline-blank" size={24}
                        color="black" style={styles.icon} onPress={() => handleToggle('participated')} />}
                {pending ? <MaterialIcons name="playlist-add-check" size={24}
                    color="black" style={styles.icon} onPress={() => handleToggle('pending')} />
                    :
                    <MaterialIcons name="playlist-add" size={24}
                        color="black" style={styles.icon} onPress={() => handleToggle('pending')} />}
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