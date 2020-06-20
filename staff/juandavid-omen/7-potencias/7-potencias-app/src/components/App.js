import React, { useState, useEffect } from 'react'
import './App.sass'
import Register from './Register'
import Login from './Login'
import Landing from './Landing'
import Home from './Home'
import Container from './Container'
import Products from './Products'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { isUserSessionValid, logoutUser, isUserLoggedIn } from '7-potencias-client-logic'

function App ({ history }) {
  useEffect(() => {
    if (isUserLoggedIn()) {
      try {
        isUserSessionValid()
          .then(isAuthenticated => {
            if (isAuthenticated) {
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    } else history.push('/')
  }, [])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => {
    history.push('/home')
  }

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()

    history.push('/')
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Container>
          <Route
            exact path='/' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
          />

          <Route
            path='/register' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
          />

          <Route path='/login' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />

          <Route path='/home' render={() => isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Redirect to='/' />} />
        </Container>
        <Products />
      </header>
    </div>
  )
}

export default withRouter(App)
