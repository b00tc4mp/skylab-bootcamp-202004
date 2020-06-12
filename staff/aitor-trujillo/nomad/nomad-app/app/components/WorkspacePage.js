import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default (props) => {
    return (
        <View>
            <Image source={require('../assets/background.jpg')} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title} >WeWork Gracia</Text>
                <Text style={styles.address}>23 st, Barcelona, Spain</Text>
                <Text style={styles.price} >99€ / month</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginVertical: 5
    },
    address: {
        color: 'grey',
        fontSize: 18,
        marginVertical: 5
    },
    price: {
        color: 'grey',
        // fontWeight: 'bold',
        textAlign: 'left',
        fontWeight: 'bold',
        width: '100%',
    }

})
