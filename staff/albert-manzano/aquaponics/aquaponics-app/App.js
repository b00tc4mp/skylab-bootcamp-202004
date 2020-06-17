
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

import logic, { retrieveUser } from 'aquaponics-client-logic'

logic.__context__.storage = AsyncStorage;

export default function App() {
  const [view, setView] = useState('forecast')
  const [error, setError] = useState()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const handleAuthorized = async (token) => {
    const { name, confirmed, role, status } = await retrieveUser(token)
    if (confirmed && status === 'enable') {
      setName(name)
      setRole(role)
      setView('home')
    } else {
      setView('home')
      throw new Error('Contact your provider to confirm your registration')
    }
  }

  logic.__context__.storage = AsyncStorage;


  const handleGoToManager = () => {
    setView('manager')
  }

  const handleGoToCharts = () => {
    setView('charts')
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

    preventDefault(event)
    const result = await AsyncStorage.removeItem("token")
    console.log(result)
    if (result === null) setView('landing')
  }

  return (<>
    <SafeAreaView style={styles.container}>
      {view === 'landing' && <Landing view={'landing'} error={error} onAuthorized={handleAuthorized} />}
      {view === 'home' && <Home role={role} name={name} error={error} onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'charts' && <Charts onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'manager' && <Manager onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'greenhouse' && <Greenhouse onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'forecast' && <Forecast onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'calendar' && <Calendar onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
    </SafeAreaView>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});