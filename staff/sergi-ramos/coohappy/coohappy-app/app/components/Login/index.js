import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, ScrollView, SafeAreaView, Alert } from 'react-native'
import styles from './styles'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../ButtonForm'
import { authenticateUser, retrieveUser } from 'coohappy-client-logic'


const Login = function ({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmitLogin = async () => {

        try {

            await authenticateUser(email, password)
            const user = await retrieveUser()

            
            if(!user.cohousing) navigation.navigate('WellcomePage')
            else navigation.navigate('Home')
  
        } catch (error) {
            Alert.alert('OOPS!!', error.message)  
        }
    }

    return (

        <SafeAreaView>

            <TouchableOpacity style={styles.closeItem} onPress={() => navigation.navigate('Landing')}>

                <SvgUri source={require('../../assets/ic-close.svg')} />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Log in</Text>
                        <TextInput style={styles.input}  onChangeText={value => setEmail(value)} placeholder="email" placeholderTextColor="#81868e" />
                        <TextInput style={styles.input}  onChangeText={value => setPassword(value)} secureTextEntry={true} placeholder="password" placeholderTextColor="#81868e" />
                        <ButtonForm text="LOG IN" bgColor="#009965" buttonAction={handleOnSubmitLogin} />
                    </View>

                    <View>
                        <View style={styles.bar}></View>
                    </View>

                    <View>
                        <Text style={styles.textAskMember} >NOT A MEMBER?</Text>
                    </View>

                    <View style={{ width: '90%' }} >
                        <ButtonForm text='REGISTER' buttonAction={() => navigation.navigate('Register')} bgColor="#003725" />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login

