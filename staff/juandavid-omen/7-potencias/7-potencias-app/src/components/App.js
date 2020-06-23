import React, { useState, useEffect } from 'react'
import { App, Card, Login, Register, Home, Landing, NavBar, Products, ShoppingCart, Feedback, Footer } from '../components'
import { isUserSessionValid, logoutUser, isUserLoggedIn } from '7-potencias-client-logic'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './App.sass'

export default withRouter(function ({ history }) {
  const [view, setView] = useState()

  useEffect(() => {
    if (sessionStorage.token) {
      try {
        isUserSessionValid(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setView('home')
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    } else history.push('/')
  }, [history])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => history.push('/home')

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()

    history.push('/')
  }

  return (
    <div className='app'>
      <NavBar onLogout={handleLogout} token={sessionStorage.token} />
      <main>
        <Route exact path='/' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />
        <Route path='/register' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />
        <Route path='/login' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />
        <Route path='/home' render={() => isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Redirect to='/' />} />
        <Route path='landing' render={() => <Landing />} />
        <Route path='/lessons' render={() => <Products token={sessionStorage.token} />} />
      </main>

      <Footer />

    </div>
  )
})
