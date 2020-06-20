import React, { useState, useEffect } from 'react'
// import './App.css'
import Container from './Container'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Search from './Search'
import Worker from './Worker'
import {isUserAuthenticated, isUserLogin} from 'takemytask-client-logic'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { userTransition, animated} from 'react-spring'

function App({history}) {

  const [userName, setUserName] = useState()
  const [searchQuerry, setSearchQuerry] = useState()
  const [workerId, setWorkerId] = useState ()

  // const handleLogout = () => {
  //   setToken()
  //   delete sessionStorage.token

  //   history.push('/')
  // }

  //  || anime ||

  

  useEffect ( () => {
    if(isUserLogin){
      try{

        isUserAuthenticated()
          .then( name => {
            if(name){
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

  const handleGoToRegister = () => {
    history.push('./register')
  }

  const handleGoToLogin = () => history.push('/login')

  const handelGoToHome = () => history.push('/home')

  const handelGoToSearch = () => history.push('/search')

  const handelGoToWorker = (id) => { 
    setWorkerId(id)
    history.push('/worker-profile')
  }

  const handleLogin = token => {

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

  const handelSearcher = (query) => {
    setSearchQuerry(query)
    history.push('/search')
  }


  return (
    <div className="App">
        <Container onGoToHome={handelGoToHome} onGoToSearch={handelGoToSearch}>

          <Route exact path="/home" render={() => <Home onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} userName={userName} onRegister={handleRegister} onSearcher={handelSearcher}/>} />

          <Route path="/register" render={() =>
            isUserLogin() ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} onGoToHome={handelGoToHome}/>
          } />

          <Route path="/login" render={() =>
            isUserLogin() ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} onGoToHome={handelGoToHome}/>
          } />

          <Route path="/search" render={() =>
            <Search query={searchQuerry} userName={userName} onGoToLogin={handleGoToLogin} onSearcher={handelSearcher} onGoToWorker={handelGoToWorker}/>
          } />

          <Route path="/worker-profile" render={() =>
            <Worker workerId={workerId}/>
          } />

        </Container>
    </div>
  )
}

export default withRouter(App)
