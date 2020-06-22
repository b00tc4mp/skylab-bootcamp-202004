import React, { useState, useEffect } from 'react';
import Register from './Register'
import Container from './Container'
import Login from './login'
import Home from './Home'
import Landing from './Landing'
import '../App.css';

import {Route,  Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import { isUserAuthenticated, registerUser } from 'plates-client-logic'

function App ({history}) {
    const [ token, setToken ] = useState()
    const [ view, serView ] = useState()

    useEffect(() =>{
        if(sessionStorage.token)

            try {
                isUserAuthenticated(sessionStorage.token)
                .then(isAuthenticated => {
                    if(isAuthenticated) {
                        setToken(sessionStorage.token)
                    }
                })
                .catch(error => {throw Error})
            } catch (error) {
                if(error) throw error
            }
            else history.push('/')

    }, [])

    const handleGoToRegister =() => history.push('/register')

    const handleGoToHome = (token) => {
        sessionStorage.token = token
        history.push('/home')
    }

    const handleGoToLogin = () => history.push('/login')

    const handleLogout = () =>{

    // TODO logoutUser()

     history.push('/')
    
    }

    return(
        
        <div className ="App">
            <header className="App-header">
                <Container>
                    <Route exact path="/" render={()=> isUserAuthenticated() ? <Redirect to="/home" /> : <Landing onGoToRegister ={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />
                    <Route exact path="/register" render={ () =>
                         isUserAuthenticated ? <Redirect to="/home" /> : <Register onGoToLogin={handleGoToLogin}/>  }/>
                    <Route exact path="/login" render={ () => 
                         isUserAuthenticated ? <Redirect to="/home" /> : <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister}/> } />
                    <Route exact path="/home" render = { () => isUserAuthenticated() ? <Home onLogout={handleLogout} token={token}/> : <Redirect to="/"/>} />               
                </Container>
            </header>
        </div>
    )
}

export default withRouter(App)


