import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import ButtonForm from './ButtonForm'

const UpdateUser = function({ navigation }) {

    return (

        
                <View style={styles.container}>

                    <View style={styles.header}>
                        <SvgUri style={styles.returnIcon} source={require('../assets/ic-arrow-back-yellow.svg')} />
                        <Text style={styles.titleText}>TODO TODO</Text>
                    </View>

                    <View style={styles.form}>
                        <TextInput style={styles.input} placeholder="email" placeholderTextColor="#81868e"/>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="#81868e"/>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="#81868e"/>
                        <Text style={styles.textPassword}>CHANGE PASSWORD</Text>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="#81868e"/>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="#81868e"/>
                        <TextInput style={styles.input} placeholder="password" placeholderTextColor="#81868e"/>
                    </View>

                    <View style={{ width: '90%', marginTop:10 }}>
                        <ButtonForm text="SAVE CHANGES" bgColor="#009965" />
                    </View>

                    <View style={{ width: '90%', marginTop: 30 }} >
                        <ButtonForm text='LOGOUT' onPress={() => navigation.navigate('Register')} bgColor="#003725" />
                    </View>

                </View>
       
    )
}

export default UpdateUser

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
        justifyContent: 'flex-start',
        color: '#ffd545',
        flexDirection: "row",
        marginBottom:30
    },
    titleText: {
        color: '#ffd545',
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 20,
        marginLeft: 20,
        width: 300
    },
    returnIcon: {
        marginBottom: 25,
        marginLeft: 20
    },
    form: {
        width: '90%'
    },
    input: {
        backgroundColor: '#e4e4e4',
        height: 55,
        marginBottom: 20,
        paddingLeft: 10,
        color: 'black'
    },
    textPassword: {
        marginTop: 10,
        marginBottom: 20,
        fontWeight: "bold"
    }
})