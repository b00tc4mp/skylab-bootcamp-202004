import React, { useState, useEffect } from 'react'
import './App.sass'
import Hello from './Hello'
import Register from './Register'
import Login from './Login'
import Landing from './Landing'
import Home from './Home'
import Container from './Container'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { isUserAuthenticated } from 'misc-client-logic'

function App({ history }) {
  const [token, setToken] = useState()
  // const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFjNDg5OTZiMzNjNzAwMTU0MmU5MmIiLCJpYXQiOjE1ODg2NzE4MDEsImV4cCI6MTU4ODY3NTQwMX0.RS0HvoBYhCY7Li4oEAiOB1AtwfoPSLRTQTAd4vKk4OA')

  useEffect(() => {
    if (sessionStorage.token)
      try {
        isUserAuthenticated(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setToken(sessionStorage.token)
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

  const handleLogin = token => {
    sessionStorage.token = token
    setToken(token)

    history.push('/home')
  }

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    setToken()
    delete sessionStorage.token

    history.push('/')
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <Hello name="Manuel" /> */}

        <Container>
          <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />

          <Route path="/register" render={() =>
            token ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />
          } />

          <Route path="/login" render={() =>
            token ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
          } />

          <Route path="/home" render={() =>
            token ? <Home onLogout={handleLogout} token={token} /> : <Redirect to="/" />
          } />

          {/* demo http://localhost:3000/#/hello/WORLD */}
          <Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
        </Container>
      </header>
    </div>
  )
}

export default withRouter(App)
