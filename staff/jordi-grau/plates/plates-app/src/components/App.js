import React, { useState, useEffect } from 'react';
import Register from './Register'
import Container from './Container'
import Header from './Header'
import Login from './Login'
import Home from './Home'
import Landing from './Landing'
import { isUserLoggedIn, logoutUser, isUserSessionValid } from 'plates-client-logic'
import Feedback from './Feedback'

import { Route,  Redirect, withRouter } from 'react-router-dom'
// import Navbar from './Navbar';

function App ({history}) {
    const [ view, setView ] = useState()
    const [ error, setError ] = useState()


    useEffect(() =>{
        if(isUserLoggedIn())
            try {
                isUserSessionValid()
                .then(isAuthenticated => {
                    if(!isAuthenticated) {
                        history.push('/')
                    } 
                })
            } catch (error) {
                if(error) throw error
            }
        else history.push('/')

    }, [])
 
    const handleGoToRegister = event =>{
        event.preventDefault()
        history.push('/register')
    }

    const handleGoToHome = () => {
        history.push('/home')
    }

    const handleGoToLogin = event => {
        event.preventDefault()
        history.push('/login')}

    const handleLogout =  () =>{
        logoutUser()
        history.push('/')
    
    }

    return(
        
        <div className ="App">
            <header className="App-header">
            <Header />
                <Container>
                   <Route exact path="/" render={()=> isUserLoggedIn() ? <Redirect to="/home" /> : <Landing onGoToRegister ={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />
                    <Route exact path="/register" render={ () =>
                         isUserLoggedIn() ? <Redirect to="/home" /> : <Register onGoToLogin={handleGoToLogin}/>  }/>
                    <Route exact path="/login" render={ () => 
                         isUserLoggedIn() ? <Redirect to="/home" /> : <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister}/> } />
                    <Route path="/home" render = { () => isUserLoggedIn() ? <Home onLogout={handleLogout} history={history}/> : <Redirect to="/"/>} />               
                    
                    {error && <Feedback message={error} level="error" />}
                </Container>
              
            </header>
        </div>
    )
}

export default withRouter(App)

