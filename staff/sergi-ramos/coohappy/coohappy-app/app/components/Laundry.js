import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native'
import SvgUri from "expo-svg-uri"
import HeaderHome from './HeaderHome'
import WeekDays from './WeekDays';

const Laundry = function ({ navigation }) {

    return (

        <View style={styles.container}>

            <HeaderHome user={'La Floca'} />
            <View style={styles.daysContainer}>
                <Text style={styles.textLaundry}>Reserve your washing machine!</Text>
                <WeekDays />
            </View>
        </View>
    )
}

export default Laundry

const styles = StyleSheet.create({
    container: {
        
        width: '100%'
    

    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        backgroundColor: '#069b69',
    },
    textLaundry: {

        fontWeight: '700',
        fontSize: 20,
        width:'100%',
        marginLeft: 25,        
        marginTop: 25,
        marginBottom:15 
    },
    daysContainer: {
        width: '100%'
    }

})