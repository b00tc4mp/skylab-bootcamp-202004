import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../components/ButtonForm'
import { joinCommunity, retrieveUser, retrieveCohousing } from 'coohappy-client-logic'

const JoinCommunity = function ({ navigation }) {

    const [accesCode, setAccesCode] = useState()

    const handleOnJoinCommunity = async () => {

        try {
                     

                await joinCommunity(accesCode)
                const user = await retrieveUser()
                const cohousing = await retrieveCohousing()
                if(cohousing) navigation.navigate('Home')
          
           
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
                        <SvgUri style={styles.userIcon} source={require('../assets/ic-user.svg')} />
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