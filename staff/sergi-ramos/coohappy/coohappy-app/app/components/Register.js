import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView, Alert } from 'react-native'
import SvgUri from 'expo-svg-uri'
import { registerUser } from 'coohappy-client-logic'
import ButtonForm from './ButtonForm'


const Register = function({ navigation })  {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleOnSubmit = async() => {
        console.log(name)
        try {
            await registerUser(name, surname, email, password, confirmPassword)
            navigation.navigate('Login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={{ alignSelf: 'flex-end', marginRight: 20 }}>

                <SvgUri style={styles.closeItem} source={require('../assets/ic-close.svg')} />

            </TouchableOpacity>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Register</Text>
                        <TextInput style={styles.input} onChangeText={value => setName(value)} name="name" placeholder="name" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} onChangeText={value => setSurname(value)} name="surname" placeholder="surname" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} onChangeText={(value) => setEmail(value)} name="email" placeholder="email" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setPassword(value)} name="password" placeholder="password" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setConfirmPassword(value)} name="confirm" placeholder="confirm password" placeholderTextColor="#81868e" />
                        <ButtonForm text="REGISTER" bgColor="#009965" buttonAction={handleOnSubmit} />
                    </View>

                    <View>
                        <View style={styles.bar}></View>
                    </View>

                    <View >
                        <Text style={styles.textAskMember}>ARE YOU A MEMBER?</Text>
                    </View>

                    <View style={{ width: '90%' }} >
                        <ButtonForm text="LOG IN" bgColor="#003725" buttonAction={() => navigation.navigate('Login')} />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 40,
        alignSelf: 'flex-start',
        marginBottom: 28,
        fontWeight: "bold",
        width: '100%'
    },
    input: {
        backgroundColor: '#E4E4E4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: '#81868e'
    },
    form: {
        width: '90%'
    },
    buttonLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009965',
        alignSelf: 'center',
        width: '100%',
        height: 60,
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30
    },
    buttonGoToRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003725',
        alignSelf: 'center',
        width: '100%',
        height: 60,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 30
    },
    bar: {
        width: 240,
        height: 1,
        backgroundColor: '#003725',
        marginTop: 45,
        marginBottom: 45
    },
    closeItem: {
        alignSelf: 'flex-end',
        marginTop: 50
    },
    textAskMember: {
        marginBottom: 20,
        fontWeight: "bold",
        width: 150,

    }
})