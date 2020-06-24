
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  Alert,
  AsyncStorage,
} from 'react-native';

import { Landing, Home, Charts, Forecast, Manager, Greenhouse} from './src/components';


import logic, { retrieveUser, logout, retrieveLastTemperature, retrieveLastPh, isUserLoggedIn, isUserSessionValid } from 'aquaponics-client-logic'

logic.__context__.storage = AsyncStorage;

export default function App() {
  const [view, setView] = useState('landing')
  const [error, setError] = useState()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [lastTemp, setLastTemp] = useState('')
  const [lastPh, setLastPh] = useState('')
  const [confirmed,setConfirm] = useState ('')

  useEffect(() => {
    if (isUserLoggedIn())
      try {
        isUserSessionValid()
          .then(isAuthenticated => {
            if (isAuthenticated) {
              handleAuthorized()
              
            } else setView('landing')
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    else setView('landing')
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          const lastTemp = await retrieveLastTemperature()
          const lastPh = await retrieveLastPh()
          
          setLastTemp(lastTemp)
          setLastPh(lastPh)
        } catch (error) {
          setError('Warning! Could not retrieve last data from greenhouse')
        }
      })()
    }, 10000);
    return () => clearTimeout(timer);
  }, [lastTemp]);

  const handleAuthorized = async () => {
    const { name, confirmed, role, status } = await retrieveUser()
    
    if (confirmed && status === 'enable') {
      setName(name)
      setRole(role)
      setView('home')
    } else {
      setConfirm('Wait for your provider to confirm your profile')
    }
  }

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
    setView('calendary')
  }

  const handleGoToLogout = async (event) => {

    event.preventDefault()
    logout()
    setView('landing')
  }

  return (<>
    <SafeAreaView style={styles.container}>
      {view === 'landing' && <Landing  confirmed={confirmed} error={error} onAuthorized={handleAuthorized} />}
      {view === 'home' && <Home role={role} name={name} error={error} onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'charts' && <Charts role={role} onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'manager' && <Manager role={role} onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'greenhouse' && <Greenhouse role={role} lastPh={lastPh} lastTemp={lastTemp} onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'forecast' && <Forecast role={role} onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
      {view === 'calendary' && <Calendar onGoToManager={handleGoToManager} onGoToCharts={handleGoToCharts} onGoToGreenhouse={handleGoToGreenhouse} onGoToForecast={handleGoToForecast} onGoToCalendar={handleGoToCalendar} onGoToLogout={handleGoToLogout} />}
    </SafeAreaView>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});