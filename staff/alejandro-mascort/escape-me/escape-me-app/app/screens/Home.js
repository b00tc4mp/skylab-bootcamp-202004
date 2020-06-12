import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import Card from '../components/Card'

export default function (props) {
    return (
        <SafeAreaView style={{
            backgroundColor: '#f8f4f4',
            padding: 10,
            paddingTop: 30,
        }}>
            <ScrollView>
                <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image={require('../assets/whitechapel.jpg')} />
                <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image={require('../assets/whitechapel.jpg')} />
                <Card title="Whitechapel" rating="4.9" people='2-6' genre='Terror' price="50-90€" image={require('../assets/whitechapel.jpg')} />
            </ScrollView>
        </SafeAreaView>
    )
}

