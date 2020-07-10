import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../ButtonForm'
import { joinCommunity, retrieveCohousing } from 'coohappy-client-logic'
import styles from './styles'

const JoinCommunity = function ({ navigation }) {

    const [accesCode, setAccesCode] = useState()

    const handleOnJoinCommunity = async () => {

        try {
            await joinCommunity(accesCode)
            const cohousing = await retrieveCohousing()
            if (cohousing) navigation.navigate('Home')

        } catch (error) {

            Alert.alert('OOPS!', error.message)
        }
    }

    return (

        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>Join a community</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UpdateUser')}>
                        <SvgUri style={styles.userIcon} source={require('../../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%' }}>
                    <Text style={[styles.title, { textAlign: 'left' }]}>COMMUNITY PASSWORD</Text>
                    <Text style={styles.text}>Enter the password that your neighbor gave you to join in your commuinty</Text>
                    <TextInput style={styles.input} onChangeText={(value) => setAccesCode(value)} placeholder="password" placeholderTextColor="#81868e" />
                </View>

                <View style={{ width: '90%' }}>
                    <ButtonForm buttonAction={handleOnJoinCommunity} text="JOIN A COMMUNITY" bgColor="#009965" />
                </View>

                <View>
                    <View style={styles.bar}></View>
                </View>

                <View style={{ width: '90%', marginTop: 30 }} >
                    <Text style={styles.title}>DO YOU WANT TO CREATE A NEW COMMUNITY?</Text>
                    <ButtonForm text='CREATE A COMMUNITY' buttonAction={() => navigation.navigate('CreateCommunity')} bgColor="#003725" />
                </View>

            </View>
        </>

    )
}

export default JoinCommunity

