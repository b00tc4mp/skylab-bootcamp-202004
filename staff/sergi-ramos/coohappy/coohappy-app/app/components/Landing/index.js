import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import SvgUri from "expo-svg-uri"
import styles from './styles'
import { retrieveUser } from 'coohappy-client-logic'

const Landing = function ({ navigation }) {

  useEffect(() => {
    (async () => {
      debugger
      const token = await AsyncStorage.getItem('TOKEN')
      const user = await retrieveUser()
      if(user){
        if(Object.keys(user).length === 5) navigation.navigate('WellcomePage')
        else navigation.navigate('Home')
      }
    
    })()
  }, [])


  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.imageContainer}>
        <SvgUri width="100%" height="100%" source={require('../../assets/ic-logo.svg')} />
      </View>

      <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 32, color: 'white' }}> Manage your cohousing community </Text></View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.9} style={styles.buttonLogin}>
          <Text style={{ fontWeight: '700', width: 48 }} title="LOG IN" >LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')} activeOpacity={0.8} style={styles.buttonRegister}>
          <Text style={{ fontWeight: '700', color: 'white', width: 70 }} title="LOG IN" >REGISTER</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default Landing


