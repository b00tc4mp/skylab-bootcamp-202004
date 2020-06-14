import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import { ButtonForm } from '../components'

module.exports = ({ navigation }) => {

    return (

        <SafeAreaView>

            <TouchableOpacity style={styles.closeItem} onPress={() => navigation.navigate('Landing')}>

                <SvgUri source={require('../assets/ic-close.svg')} />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Log in</Text>
                        <TextInput style={styles.input} placeholder="email" placeholderTextColor="#81868e"/>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="#81868e"/>
                        <ButtonForm text="LOG IN" bgColor="#009965" />
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
        width:'100%'
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
        marginBottom:20,
        fontWeight: "bold",
        width: 120
    }

})