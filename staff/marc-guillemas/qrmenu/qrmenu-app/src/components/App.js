import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, /* BrowserRouter, */ withRouter, Redirect, useLocation } from 'react-router-dom'
import {isUserAuthenticated, isGuestUser} from 'qrmenu-client-logic';
import RegisterEstablishment from './RegisterEstablishment';
import Login from './Login'
import Home from './Home'
import Dishes from './Dishes';

function App({history}) {

  const [userRoute, setUserRoute] = useState()
  // let location = useLocation()

  useEffect(() => {
    
    if(isGuestUser(history.location.pathname)) return
    else if(sessionStorage.token){
      try {
        isUserAuthenticated(sessionStorage.token)
          .then(authenticated =>{
            //  if(authenticated) return history.push('/')
             return history.push('/login')
             })
          .catch(error => {throw Error})
      } catch (error) {
        if(error) throw error
      }

    }else history.push('/login')
  }, [])

  const handleGoToLogin = () => history.push('/login')
  const handleRegister = () => history.push('/login')
  const handleGoToRegister = () => history.push('/register')
  const handleLogin = token => {
  
    sessionStorage.token = token  
    history.push('/')
  }

  const handleOnLogout = () => {
    delete sessionStorage.token
    history.push('/login')
  }

  const handleOnScan = (qrlink) => {
    console.info(qrlink)
    setUserRoute(qrlink)
  }

  return (
    <section className="App">
      
       <Route path="/register" render={() => 
        sessionStorage.token? <Redirect to="/"/> : <RegisterEstablishment onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>
      } />

      <Route path="/login" render={() => 
        sessionStorage.token? <Redirect to="/"/> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>
      } />

       
      <Route path="/" render={() => 
        <Home onLogout={handleOnLogout} history={history} onScan={handleOnScan}/>
      } />
      
      {/* <Route path="/establishment/5eedfc1956012e6c3dbb7caf/table/5eedfc3256012e6c3dbb7cb3" render={() => 
        <Dishes/>
      } /> */}

    </section>
  );
}

export default withRouter(App);
