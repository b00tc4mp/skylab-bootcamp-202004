import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
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
});