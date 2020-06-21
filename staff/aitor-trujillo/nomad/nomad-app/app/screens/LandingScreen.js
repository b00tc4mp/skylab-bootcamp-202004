import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AppButton from '../components/Button'

const bgImage = require('../assets/background.jpg')

export default ({ navigation }) => {
  return (
    <ImageBackground source={bgImage} style={[styles.background, { paddingBottom: 30 }]}>
      <View style={styles.textContainer}>
        <Text style={styles.logoText} >nomad</Text>
        <Text style={styles.claimText} >
          Work{"\n"}Share{"\n"}Travel
        </Text>
        <Text style={styles.descriptionText} >
          Find your next workspace, share your{"\n"} work with people like you, go beyond{"\n"} geographical limits.
          </Text>
      </View>
      <AppButton title="Sign up, it's free!" bgColor={'primary'} txtColor='dark' onPress={() => navigation.navigate('Register')} />
      <AppButton title='Sign in' bgColor={'secondary'} txtColor='light' onPress={() => navigation.navigate('Login')} />
    </ImageBackground>

  );

};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: "center",
    shadowOpacity: 0.3,
  },
  textContainer: {
    position: "absolute",
    top: 70,
    alignItems: 'center',
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 36,
    letterSpacing: 30,
    textAlign: "center",
    width: 235,
    height: 50,
    color: "white",
  },
  claimText: {
    marginTop: 100,
    fontWeight: "bold",
    fontSize: 60,
    letterSpacing: 8,
    color: "white",
    textAlign: "center",
  },
  descriptionText: {
    marginTop: 70,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
})
