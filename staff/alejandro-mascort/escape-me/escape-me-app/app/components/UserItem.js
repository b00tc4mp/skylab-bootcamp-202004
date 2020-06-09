import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    email: {
        fontSize: 18
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold'
    }
})

export default UserItem