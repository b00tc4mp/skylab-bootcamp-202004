import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, ScrollView, SafeAreaView, Alert } from 'react-native'
import styles from './styles'
import SvgUri from 'expo-svg-uri'
import { registerUser } from 'coohappy-client-logic'
import ButtonForm from '../ButtonForm'
import confirmPassword from 'coohappy-client-logic/helpers/confirmPassword'


const Register = function({ navigation })  {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setpasswordConfirm] = useState('')

    const handleOnSubmit = async() => {
        try {
            confirmPassword(password,passwordConfirm)
            await registerUser(name, surname, email, password, confirmPassword)
            navigation.navigate('Login')
        } catch (error) {
             Alert.alert('OOPS!!',error.message)
        }
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={{ alignSelf: 'flex-end', marginRight: 20 }}>

                <SvgUri style={styles.closeItem} source={require('../../assets/ic-close.svg')} />

            </TouchableOpacity>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Register</Text>
                        <TextInput style={styles.input} onChangeText={value => setName(value)} name="name" placeholder="name" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} onChangeText={value => setSurname(value)} name="surname" placeholder="surname" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} onChangeText={(value) => setEmail(value)} name="email" placeholder="email" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setPassword(value)} name="password" placeholder="password" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setpasswordConfirm(value)} name="confirm" placeholder="confirm password" placeholderTextColor="#81868e" />
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

