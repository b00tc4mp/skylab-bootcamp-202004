import React, { useState, useEffect } from 'react';
import Register from './Register'
import Container from './Container'
import Login from './Login'
import Home from './Home'
import Landing from './Landing'
import '../App.css';
import {isUserAuthenticated} from 'plates-client-logic'


import {Route,  Redirect, withRouter } from 'react-router-dom'

function App ({history}) {
    const [ view, serView ] = useState()

    useEffect(() =>{
        if(sessionStorage.token)

            try {
                isUserAuthenticated(sessionStorage.token)
                .then(isAuthenticated => {
                    // if(isAuthenticated) {
                    //     history.push('/home')
                    // }
                })
                .catch(error => {throw Error})
            } catch (error) {
                if(error) throw error
            }
            else history.push('/')

    }, [])
debugger
    const handleGoToRegister = event =>{
        event.preventDefault()
        history.push('/register')
    }

    const handleGoToHome = (token) => {
        sessionStorage.token = token
        history.push('/home')
    }

    const handleGoToLogin = event => {
        event.preventDefault()
        history.push('/login')}

    const handleLogout = () =>{

    // TODO logoutUser()

     history.push('/')
    
    }

    return(
        
        <div className ="App">
            <header className="App-header">
                <Container>
                    <Route exact path="/" render={()=> sessionStorage.token ? <Redirect to="/home" /> : <Landing onGoToRegister ={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />
                    <Route exact path="/register" render={ () =>
                         sessionStorage.token ? <Redirect to="/home" /> : <Register onGoToLogin={handleGoToLogin}/>  }/>
                    <Route exact path="/login" render={ () => 
                         sessionStorage.token ? <Redirect to="/home" /> : <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister}/> } />
                    <Route path="/home" render = { () => sessionStorage.token ? <Home onLogout={handleLogout} history={history}/> : <Redirect to="/"/>} />               
                </Container>
            </header>
        </div>
    )
}

export default withRouter(App)


