
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Alert,
  AsyncStorage,
} from 'react-native';

import { Landing, Home, Charts, Navbar, Forecast, Manager } from './src/components';

import { retrieveUser } from 'aquaponics-client-logic'

export default function App() {
  const [view, setView] = useState('landing')
  const [error, setError] = useState()
  const [name, setName] = useState('')
  const [role,setRole] = useState('')
  

  const handleAuthorized = async (token) => {
    try {
      debugger
      const result = await AsyncStorage.setItem("token", token)
      if (result === null) {
        const { name, confirmed, role, status } = await retrieveUser(token)
        if (confirmed && status==='enable') {
          setName(name)
          setRole(role)
          setView('home')
          console.log(name,role,status)
        } else {
          setView('home')
          throw new Error('Contact your provider to confirm your registration')
        }
      }
    } catch (error) {
      if (error) setError(error)
    }
  }

  useEffect(() => {
    try {
      (async () => {
        const result = await AsyncStorage.getItem("token")
        if (!result === null) setView('home')
        else setView('landing')
      })()
    } catch (error) {
      if (error) throw new Error('bleeeeee')
    }
  }, [])

  const handleGoToCharts = () => {
    setView('charts')
  }
  const handleGoToRegister = () => {
    setView('manager')
  }
  const handleGoToGreenhouse = () => {
    setView('greenhouse')
  }
  const handleGoToForecast = () => {
    setView('forecast')
  }
  const handleGoToCalendar = () => {
    setView('calendar')
  }
  const handleGoToLogout = async (event) => {
    console.log('jaaaaa')
    preventDefault(event)
    const result = await AsyncStorage.removeItem("token")
  
    if (result === null) setView('landing')
  }

  return (<>
    <SafeAreaView style={styles.container}>
      {view === 'landing' && <Landing error={error} onAuthorized={handleAuthorized} />}
      {view === 'home' && <Home role={role} name={name} error={error} onGoToCharts={handleGoToCharts} onGoToRegister={handleGoToRegister} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
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