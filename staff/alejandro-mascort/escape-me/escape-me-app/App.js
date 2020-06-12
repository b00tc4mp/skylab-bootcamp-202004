import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Landing from './app/screens/Landing'
import Home from './app/screens/Home'
import Login from './app/screens/Login'
import Register from './app/screens/Register'
import CardDetails from './app/screens/CardDetails'
import Profile from './app/screens/Profile'

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function () {
  console.disableYellowBox = true

  const [view, setView] = useState('landing')
  const [token, setToken] = useState()

  const handleGoToLogin = () => {
    setView('login')
  }

  const handleGoToRegister = () => {
    setView('register')
  }

  const handleGoToHome = () => {
    setView('home')
  }

  const handleToken = token => {
    setToken(token)
  }

  const handleLogOut = () => {
    setToken()
    setView('landing')
  }

  return (
    <View style={styles.container}>
      {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
      {view === 'login' && <Login onRegister={handleGoToRegister} onHome={handleGoToHome} handleToken={handleToken} />}
      {view === 'register' && <Register onLogin={handleGoToLogin} />}
      {token &&
        <NavigationContainer>
          <NavTabs token={token} />
        </NavigationContainer>}
    </View>

  );

}

const styles = StyleSheet.create({
  appheader: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#4ecdc4',
  },
  container: {
    flex: 1
  },
  logOut: {
    position: 'absolute',
    right: 20
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
})

const Tab = createMaterialBottomTabNavigator();

function NavTabs({ token }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "#4ecdc4" }}

    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ 'token': token }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CardDetails"
        component={CardDetails}
        options={{
          tabBarLabel: 'CardDetails',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Card"
        component={CardDetails}
        options={{
          tabBarLabel: 'CardDetails',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ 'token': token }}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
