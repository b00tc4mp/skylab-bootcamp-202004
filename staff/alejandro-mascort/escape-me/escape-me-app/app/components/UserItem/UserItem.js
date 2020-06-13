import React from 'react'
import { View, Image, Text } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { toggleFollowUser } from 'escape-me-client-logic'

const styles = require('./style')

function UserItem({ name, surname, email, image, main = false, following, userId, token }) {

    function handleFollowUser(userId) {
        (async () => toggleFollowUser(token, userId))()
    }

    return (
        <View style={styles.container}>
            <Image style={main ? styles.image : styles.littleImage} source={image} />
            <View>
                <Text style={main ? styles.username : styles.littleUsername}>{email}</Text>
                <Text style={main ? styles.name : styles.littleName}>{name} {surname}</Text>
            </View>
            {!main && (following ?
                <SimpleLineIcons style={styles.follow} name="user-unfollow" size={24} color="black" onPress={() => handleFollowUser(userId)} />
                :
                <SimpleLineIcons style={styles.follow} name="user-following" size={24} color="black" onPress={() => handleFollowUser(userId)} />)
            }
        </View>
    )
}

export default UserItem