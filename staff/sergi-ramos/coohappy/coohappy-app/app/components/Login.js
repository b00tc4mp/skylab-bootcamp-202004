import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

module.exports = ({ navigation }) => {

    return (

        <SafeAreaView>

            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: 20 }} onPress={() => navigation.navigate('Landing')}>

                        <SvgUri source={require('../assets/ic-close.svg')} />
                    </TouchableOpacity>

                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Log in</Text>
                        <TextInput style={styles.input} placeholder="email" />
                        <TextInput style={styles.input} placeholder="password" />

                        <TouchableOpacity activeOpacity={0.9} style={styles.buttonLogin}>
                            <Text style={{ color: 'white', fontWeight: '700', width: 47 }}>LOG IN</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.bar}></View>
                    </View>

                    <View>
                        <Text>NOT A MEMBER?</Text>
                    </View>

                    <View style={{ width: '90%' }} >
                        <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.9} style={styles.buttonGoToRegister} >
                            <Text style={{ color: 'white', fontWeight: '700', width: 70 }}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    loginTitle: {
        fontSize: 40,
        alignSelf: 'flex-start',
        marginBottom: 28
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 60,
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
    line: {
        marginBottom: 40
    },
    bar: {
        width: 240,
        height: 1,
        backgroundColor: '#003725',
        marginBottom: 40
    }
   
})