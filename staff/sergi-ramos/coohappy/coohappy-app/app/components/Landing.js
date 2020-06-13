import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import SvgUri from "expo-svg-uri"

module.exports = ({navigation}) => {
    return (
  
      <SafeAreaView style={styles.container}>
  

        <View style={styles.imageContainer}>
          <SvgUri width="100%" height="100%" source={require('../assets/ic-logo.svg')} />
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#009965',
      padding: 30,
    },
    landingContainer: {
      maxHeight: Dimensions.get('window').height * .95
    },
    imageContainer: {
      flex: 2,
      width: Dimensions.get('window').width * 0.65
    },
    buttonLogin: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '50%',
      height: '100%',
      borderRadius: 5,
      marginRight: '2%',
      color: '#003725'
    },
  
    buttonRegister: {
      backgroundColor: '#003725',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: '100%',
      borderRadius: 5,
      marginLeft: '2%'
  
    },
    buttonContainer: {
      height: '7%',
      flexDirection: "row",
  
    },
  });
  