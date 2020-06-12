import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './app/screens/LandingScreen'
import Home from './app/screens/HomeScreen'
import Login from './app/screens/LoginScreen'
import Profile from './app/screens/ProfileScreen'
import Card from './app/components/Card'
import AppTextInput from './app/components/AppTextInput'
import AppPicker from './app/components/AppPicker'
import AppButton from './app/components/Button'
import ListingPage from './app/components/WorkspacePage'
import Review from './app/components/Review'
import { MaterialCommunityIcons } from '@expo/vector-icons'



export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // containerCard: {
  //   backgroundColor: 'white',
  //   height: '100%',
  //   padding: 20,
  //   paddingTop: 100,
  // },
});