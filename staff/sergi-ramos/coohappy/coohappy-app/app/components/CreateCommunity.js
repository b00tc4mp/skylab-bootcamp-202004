import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage,TouchableOpacity } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../components/ButtonForm'
import { registerCohousing } from 'coohappy-client-logic'




const CreateCommunity = function ({ route, navigation }) {

    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

   
// console.log(userId)
    const handleOnCommunityRegister = async () => {
        try {
            const token = await AsyncStorage.getItem('TOKEN')
            // console.log(token)
            // console.log(name, street, number, city, country)
            await registerCohousing(name, { street, number, city, country }, 4, token)
            navigation.navigate('Home')

        } catch (error) {

            console.log(error)

        }

    }



    return (

        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>Create a community</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateUser')}>
                    <SvgUri style={styles.userIcon} source={require('../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%' }}>

                    <TextInput style={styles.input} onChangeText={value => setName(value)} placeholder="community name" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={value => setStreet(value)} placeholder="street" placeholderTextColor="#81868e" />
                    <TextInput style={styles.input} onChangeText={value => setNumber(value)} placeholder="number" placeholderTextColor="#81868e" />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    header: {
        backgroundColor: '#069b69',
        height: '17%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: "row",
        marginBottom: 30
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    bar: {
        width: 240,
        height: 1,
        backgroundColor: '#003725',
        marginTop: 45,
        marginBottom: 10
    },
    titleText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 300
    },
    userIcon: {
        marginBottom: 20,
        marginRight: 20
    },
    title: {
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 20
    },
    text: {
        color: '#81868e',
        marginBottom: 20
    }
})