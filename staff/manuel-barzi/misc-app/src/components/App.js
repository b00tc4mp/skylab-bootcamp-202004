import React, { useState, useEffect } from 'react'
import './App.sass'
import Hello from './Hello'
import Register from './Register'
import Login from './Login'
import Landing from './Landing'
import Home from './Home'
import Container from './Container'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { isUserSessionValid, logoutUser, isUserLoggedIn } from 'misc-client-logic'

function App({ history }) {
  useEffect(() => {
    if (isUserLoggedIn())
      try {
        isUserSessionValid()
          .then(isAuthenticated => {
            if (isAuthenticated) {
              // //setView('home')
            } //else setHashView('login')
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    else history.push('/')
  }, [])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => history.push('/home')

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()

    history.push('/')
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <Hello name="Manuel" /> */}

        <Container>
          <Route exact path="/" render={() => isUserLoggedIn() ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />

          <Route path="/register" render={() =>
            isUserLoggedIn() ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />
          } />

          <Route path="/login" render={() =>
            isUserLoggedIn() ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
          } />

          <Route path="/home" render={() =>
            isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Redirect to="/" />
          } />

          {/* demo http://localhost:3000/#/hello/WORLD */}
          <Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
        </Container>
      </header>
    </div>
  )
}

export default withRouter(App)
