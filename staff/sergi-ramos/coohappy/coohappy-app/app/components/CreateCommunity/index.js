import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, Alert } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../ButtonForm'
import { registerCohousing } from 'coohappy-client-logic'
import styles from './styles'


const CreateCommunity = function ({ navigation }) {

    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const handleOnCommunityRegister = async () => {
        try {
            await registerCohousing(name, { street, number, city, country }, 4)
            navigation.navigate('Home')

        } catch (error) {

            Alert.alert('OOPS!!', error.message)
        }
    }

    return (

        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>Create a community</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateUser')}>
                    <SvgUri style={styles.userIcon} source={require('../../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%' }}>

                    <TextInput style={styles.input} onChangeText={value => setName(value)} placeholder="community name" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={value => setStreet(value)} placeholder="street" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={value => setNumber(value)} keyboardType='numeric' placeholder="number" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={value => setCity(value)} placeholder="city" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={value => setCountry(value)} placeholder="country" placeholderTextColor="#81868e" />
                </View>

                <View style={{ width: '90%' }}>
                    <ButtonForm text="CREATE A COMMUNITY" bgColor="#009965" buttonAction={handleOnCommunityRegister} />
                </View>

                <View>
                    <View style={styles.bar}></View>
                </View>

                <View style={{ width: '90%', marginTop: 30 }} >
                    <Text style={styles.title}>DO YOU WANT TO JOIN AN EXISTING COMMUNITY?</Text>
                    <ButtonForm text='JOIN A COMMUNITY' buttonAction={() => navigation.navigate('JoinCommunity')} bgColor="#003725" />
                </View>

            </View>
        </>
    )
}

export default CreateCommunity

