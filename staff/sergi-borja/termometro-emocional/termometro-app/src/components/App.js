import React, { useState, useEffect } from 'react'
import './App.sass';
import { Route, withRouter, Redirect } from 'react-router-dom'
import Container from './Container';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import MyFamily from './My-Family';
import {isAuthenticated} from 'termometro-client-logic'


function App({history}) {

  const [token, setToken] = useState()

  useEffect(() => {
    if(sessionStorage.token){
      try {
        isAuthenticated(sessionStorage.token)
          .then(authenticated => {
            if (authenticated) {
              setToken(sessionStorage.token)
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    }else history.push('/')
  }, [])

  const handleGoToHome = (token) => {
    sessionStorage.token = token
    setToken(token)
    history.push('/home')
  }

  const handleGoToLogin = () => {
    history.push('/')
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Route exact path="/" render={()=> token? <Redirect to='/home'/> :<Login onLogin={handleGoToHome}/>}/>
          <Route path="/register" render={()=> token? <Redirect to='/home'/> : <Register onGoToLogin={handleGoToLogin}/>}/>
          <Route path="/home" render={()=> token? <Home/> : <Redirect to='/'/>} />
          <Route path="/my-family" render={()=> token? <MyFamily/> : <Redirect to='/'/>} />
        </Container>
      </header>
    </div>
  );

  // return (
  // <section className='footerContainer'>
  //   <div className='footerContainer__div'></div>
  // </section>
  // );
}

export default withRouter(App);
