import React, { useState, useEffect } from 'react';

import Register from './Register'
import Container from './Container'
import Header from './Header'
import Login from './Login'
import Home from './Home'
import Landing from './Landing'
import {isUserAuthenticated, logoutUser} from 'plates-client-logic'
import Feedback from './Feedback'



import {Route,  Redirect, withRouter } from 'react-router-dom'
import Navbar from './Navbar';

function App ({history}) {
    const [ view, serView ] = useState()
    const [error, setError] = useState()



    useEffect(() =>{
        if(sessionStorage.token)

        try {
            isUserAuthenticated(sessionStorage.token)
            .then(isAuthenticated => {
                if(isAuthenticated) {
                    setToken(sessionStorage.token)
                }
            })
            .catch(error => {throw error})
        } catch (error) {
            if (error) throw error    
        }
        else history.push('/')
    }, [])

    const handleGoToRegister = () => history.push('/register')

    const handleRegister = () => history.push('/login')

    const handleLogin = token => {
        sessionStorage.token(token)
        setToken(token)
        history.push('/home')
    }

    const handleGoToLogin = () => history.pussh('/login')

    const handleLogOut = () => {
        setToken()
        delete sessionStorage(token)
        history.push('/')
    }

    return (
    <div className="App" >
        <header className="HEADER!!!"> 
            <container>
                <Route exact path="/" render={()=> token ? <Redirect to="/home"/> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />

                <Route path="/register" render={() => 
                    token ? <Redirect to="/home"/> : <Register onRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />
                } />

                <Route path="/login" render ={()=>
                    token ? <Redirect to="/home"/> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>
                }/>

                <Route path="/home" render={()=> 
                    token ? <Home onLogout={handleLogOut} token={token}/> : <Redirect to="/" />
                } />
            </container>
        </header>
    </div>
    )  
}

export default withRouter(App)

