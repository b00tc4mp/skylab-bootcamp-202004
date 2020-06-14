import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import { ButtonForm } from '../components'

module.exports = ({ navigation }) => {

    return (

        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>Wellcome TODO!</Text>
                    <SvgUri style={styles.userIcon} source={require('../assets/ic-user.svg')} />
                </View>


                <View style={{ width: '90%' }}>
                    <ButtonForm text="CREATE A COMMUNITY" bgColor="#009965" />
                </View>



                <View style={{ width: '90%', marginTop: 30 }} >
                    <ButtonForm text='JOIN A COMMUNITY' onPress={() => navigation.navigate('Register')} bgColor="#003725" />
                </View>

            </View>
        </>

    )
}

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
    userIcon: {
        marginBottom: 20,
        marginRight: 20
    }
})