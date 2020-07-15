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
                    if(!isAuthenticated) {
                       
                        history.push('/')
                    }
                })
                .catch(error => {throw Error})
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
                   <Route exact path="/" render={()=> sessionStorage.token ? <Redirect to="/home" /> : <Landing onGoToRegister ={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />
                    <Route exact path="/register" render={ () =>
                         sessionStorage.token ? <Redirect to="/home" /> : <Register onGoToLogin={handleGoToLogin}/>  }/>
                    <Route exact path="/login" render={ () => 
                         sessionStorage.token ? <Redirect to="/home" /> : <Login onGoToHome={handleGoToHome} onGoToRegister={handleGoToRegister}/> } />
                    <Route path="/home" render = { () => sessionStorage.token ? <Home onLogout={handleLogout} history={history}/> : <Redirect to="/"/>} />               
                    
                    {error && <Feedback message={error} level="error" />}
                </Container>
              
            </header>
        </div>
    )
}

export default withRouter(App)


