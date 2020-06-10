import React from 'react'
import { View, Image, Text } from 'react-native'

function UserItem({ name, surname, email, image }) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View>
                <Text style={styles.name}>{name} {surname}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </View>
    )
}

export default UserItem