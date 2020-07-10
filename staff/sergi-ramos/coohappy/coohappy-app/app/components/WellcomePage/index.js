import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native'
import styles from './styles'
import SvgUri from "expo-svg-uri"
import ButtonForm from '../ButtonForm'
import { retrieveUser } from 'coohappy-client-logic'


const WellcomePage = function ({ name: _name, navigation }) {
    const [name, setName] = useState()

    useEffect(() => {

        try {
            (async () => {
                if(!_name){
                    
                    const {name} =  await retrieveUser()
                    setName(name)
                    return 
                }   
                setName(_name)    
            })()

        } catch (error) {
            Alert.alert('OOPS!!', error.message)
        }
    }, [_name])

    return (

        <>
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <Text style={styles.titleText}>Welcome {name}!</Text>
                    <TouchableOpacity onPress={ () => navigation.navigate('UpdateUser')} activeOpacity={0.8}>
                    <SvgUri style={styles.userIcon} source={require('../../assets/ic-user.svg')} />
                    </TouchableOpacity>
                </View>

                <View style={{ width: '90%' }}>
                    <ButtonForm text="CREATE A COMMUNITY" bgColor="#009965" buttonAction={() => navigation.navigate('CreateCommunity')} />
                </View>

                <View style={{ width: '90%', marginTop: 30 }} >
                    <ButtonForm text='JOIN A COMMUNITY' buttonAction={() => navigation.navigate('JoinCommunity')} bgColor="#003725" />
                </View>
                
            </View>
        </>
    )
}

export default WellcomePage

