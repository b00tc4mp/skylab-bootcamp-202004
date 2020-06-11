import React, { useState, useEffect } from 'react'
import './App.sass';
import { Route, withRouter, Redirect } from 'react-router-dom'
import Container from './Container';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import MyFamily from './MyFamily';
import Footer from './Footer'
import {isAuthenticated} from 'termometro-client-logic'
import CreateMember from './CreateMember';


function App({history}) {

  const [token, setToken] = useState()
  const [userName, setUserName] = useState()

  useEffect(() => {
    if(sessionStorage.token){
      try {
        isAuthenticated(sessionStorage.token)
          .then(userName => {
            if (userName) {
              setToken(sessionStorage.token)
              setUserName(userName)
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
    try {
      isAuthenticated(token)
        .then(userName => {
          setUserName(userName)
          setToken(token)
          history.push('/home')
        })
        .catch(error => { throw error })
    } catch (error) {
      if (error) throw error
    }
    
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
          <Route path="/home" render={()=> token? <Home userName={userName}/> : <Redirect to='/'/>} />
          <Route path="/my-family" render={()=> token? <MyFamily token={token}/> : <Redirect to='/'/>} />
          <Route path="/create-member" render={()=> token? <CreateMember token={token}/> : <Redirect to='/'/>} />
          <Footer />
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
