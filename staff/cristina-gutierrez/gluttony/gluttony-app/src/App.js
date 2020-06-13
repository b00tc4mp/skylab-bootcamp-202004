import React, { Component } from "react"
import { Text, View, StyleSheet } from "react-native"
import Home from "./Home";
import Modal from "./Modal";





class Gluttony extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.headerLeft}>
        
      </View>
      <View style={styles.headerRight}>
      
      </View>
      <View style={styles.body}>
        <Text>Hello world</Text>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },

  headerLeft: {
    flex: 1,
    backgroundColor: "yellow"
  },

  headerRight: {
    flex: 1,
    backgroundColor: "blue"
  },

  body: {
    flex: 1,
    backgroundColor: "red"
  }
})

export default Gluttony





/* import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}); */
