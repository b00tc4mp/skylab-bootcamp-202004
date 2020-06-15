
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Alert
} from 'react-native';

import { Landing, Home, Charts, Navbar, Forecast, Manager } from './src/components';

export default function App() {
  const [view, setView] = useState('landing')
  const [error, setError] = useState('fffffffffffffffffffffffffff')

  const handleLogin = (username, password) => {
    console.log(password)
    console.log(username)
  }

  const handleRegister =async(name,surname,email,password)=>{
    console.log(name)
    console.log(surname)
    console.log(email)
    console.log(password)
  }

  

  return (<>
    <SafeAreaView style={styles.container}>
      {view === 'landing' && <Landing error={error} onLogin={handleLogin} onRegister={handleRegister}/>}
      {view === 'home' && <Home />}
      {view === 'charts' && <Charts />}
      {view === 'manager' && <Manager />}
      {view === 'greenhouse' && <Greenhouse />}
      {view === 'forecast' && <Forecast />}
      {view === 'calendar' && <Calendar />}
    </SafeAreaView>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});