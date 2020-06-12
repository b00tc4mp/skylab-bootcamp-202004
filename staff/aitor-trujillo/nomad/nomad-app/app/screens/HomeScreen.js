import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import AppleHeader from '../components/AppleHeader'

import Card from '../components/Card'

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}></View>
            <AppleHeader imageSource={require('../assets/aitor.jpg')} />
            <View style={styles.containerCards}>
                <Card
                    title='WeWork Barcelona'
                    address='23 st, Barcelona'
                    rating='5'
                    price='99€ / month'
                    image={require('../assets/cowork.jpg')}
                />
                <Card
                    title='WeWork Barcelona'
                    address='23 st, Barcelona'
                    rating='5'
                    price='99€ / month'
                    image={require('../assets/cowork.jpg')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f4f4',
        height: '100%',
    },
    containerHeader: {
        padding: 20,
    },
    containerCards: {
        height: '100%',
        padding: 20,
    },
})