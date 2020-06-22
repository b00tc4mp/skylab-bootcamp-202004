import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView, AsyncStorage,Alert } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../components/ButtonForm'
import { authenticateUser } from 'coohappy-client-logic'




const Login = function ({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmitLogin = async () => {

        try {

            await authenticateUser(email, password)
            navigation.navigate('Home')
           // await AsyncStorage.setItem('TOKEN', resToken)
            // const token = await AsyncStorage.getItem('TOKEN')
            // if(!token)  navigation.navigate('WellcomePage')
            // else navigation.navigate('Home')

            // const { name } = await retrieveUser(token)
            // await setName(name)
            // navigation.navigate('Home',{
                //     screen: 'Chat',
                //     params: {name, surname}
                // })
                
        } catch (error) {
            if(error.message === 'string is empty or blank') Alert.alert('OOPS!!', 'Some field is empty')
            if(error.message === `${password} length is not greater or equal than 8`) Alert.alert('OOPS!!', 'Password must be a minimum of 8 letters')
            else Alert.alert('OOPS!',error.message)
            
        }
    }


    return (

        <SafeAreaView>

            <TouchableOpacity style={styles.closeItem} onPress={() => navigation.navigate('Landing')}>

                <SvgUri source={require('../assets/ic-close.svg')} />
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
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    form: {
        width: '90%'
    },

    line: {
        marginBottom: 40
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
        marginTop: 50,
        marginRight: 22
    },
    textAskMember: {
        marginBottom: 20,
        fontWeight: "bold",
        width: 120
    }

})