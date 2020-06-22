import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Landing from './app/screens/Landing'
import Login from './app/screens/Login'
import Register from './app/screens/Register'
import Manager from './app/screens/Manager'

export default function () {
  console.disableYellowBox = true

  const [view, setView] = useState('landing')
  const [value, setValue] = useState(0)

  const handleGoToLogin = () => {
    setView('login')
  }

  const handleGoToRegister = () => {
    setView('register')
  }

  const handleGoToHome = () => {
    setView('home')
  }

  const handleLogOut = () => {
    //   setToken()
    //   setView('landing')
  }

  return (
    <View style={styles.container}>
      {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
      {view === 'login' && <Login onRegister={handleGoToRegister} onHome={handleGoToHome} />}
      {view === 'register' && <Register onLogin={handleGoToLogin} />}
      {view === 'home' && <Manager />}
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