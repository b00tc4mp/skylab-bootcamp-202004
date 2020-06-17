import React, { useState, useEffect } from 'react'
// import './App.css'
import Container from './Container'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import {isUserAuthenticated} from 'takemytask-client-logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

function App({history}) {

  const [token, setToken] = useState()
  const [userName, setUserName] = useState()

  // const handleLogout = () => {
  //   setToken()
  //   delete sessionStorage.token

  //   history.push('/')
  // }

  useEffect ( () => {
    if(sessionStorage.token){
      try{

        isUserAuthenticated(sessionStorage.token)
          .then( name => {
            if(name){
              setToken(sessionStorage.token)
              setUserName(name)
            }
          })
          .catch( error => {throw error})

      }catch(error){
        throw error
      }
    }else{
      history.push('/home')
    }
  }, [])

  const handleRegister = () => history.push('/login')

  const handleGoToRegister = () => history.push('./register')

  const handleGoToLogin = () => history.push('/login')

  const handleLogin = token => {

    sessionStorage.token = token
    setToken(token)
    history.push('/home')

    try{

      isUserAuthenticated(token)
        .then( name => {
          if(name){
            setUserName(name)
          }
        })
        .catch( error => {throw error})

    }catch(error){
      throw error
    }

  }

  return (
    <div className="App">
        <Container>

        <Route exact path="/home" render={() => <Home onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} token={token} userName={userName}/>} />

        <Route path="/register" render={() =>
          token ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />
        } />

        <Route path="/login" render={() =>
          token ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
        } />

        </Container>
    </div>
  )
}

export default withRouter(App)
