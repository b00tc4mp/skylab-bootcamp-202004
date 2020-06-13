import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import  SvgUri  from 'expo-svg-uri'

module.exports = ({ navigation }) => {

    return (
        <SafeAreaView>

            <ScrollView >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('Landing')} style={{alignSelf: 'flex-end', marginRight: 20 }}>

                    <SvgUri style={styles.closeItem} source={require('../assets/ic-close.svg')} />
                    
                    </TouchableOpacity>
                    <View style={styles.form}>
                        <Text style={styles.loginTitle}>Register</Text>
                        <TextInput style={styles.input} placeholder="name" />
                        <TextInput style={styles.input} placeholder="surname" />
                        <TextInput style={styles.input} placeholder="email" />
                        <TextInput style={styles.input} placeholder="password" />
                        <TextInput style={styles.input} placeholder="confirm password" />

                        <TouchableOpacity activeOpacity={0.9} style={styles.buttonLogin}>
                            <Text style={{ color: 'white', fontWeight: '700', width: 70 }}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.bar}></View>
                    </View>

                    <View>
                        <Text>ARE YOU A MEMBER?</Text>
                    </View>

                    <View style={{ width: '90%' }} >
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.9} style={styles.buttonGoToRegister} >
                            <Text style={{ color: 'white', fontWeight: '700', width: 70 }}>LOG IN</Text>
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
        marginTop: 70
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
    bar: {
        width: 240,
        height: 1,
        backgroundColor: '#003725',
        marginBottom: 40
    },
    closeItem: {

    }
})