import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, /* BrowserRouter, */ withRouter, Redirect } from 'react-router-dom'
import {checkAuthentication} from 'qrmenu-client-logic';
import RegisterEstablishment from './RegisterEstablishment';
import Login from './Login'

function App({history}) {
  const [token, setToken] = useState()

  useEffect(() => {
    if(sessionStorage.token)
      try {
        checkAuthentication(token)
          .then(isAuthenticated => {
            if(isAuthenticated) {
              setToken(sessionStorage.token)
            }
          })
          .catch(error => {throw Error})
      } catch (error) {
        if(error) throw error
      }
    else history.push('/register')
  }, [])

  const handleGoToLogin = () => history.push('/login')
  const handleRegister = () => history.push('/login')
  const handleGoToRegister = () => history.push('/register')
  const handleLogin = token => {
    setToken(token)  
    history.push('/')
  }

  return (
    <section className="App">
        {/* <Container> */}
          <Route path="/register" render={() => 
            token? <Redirect to="/home"/> : <RegisterEstablishment onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>
          } />
          <Route path="/login" render={() => 
            token? <Redirect to="/home"/> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister}/>
          } />

          {/* <BrowserRouter> */}
                {/* <Route path='/' exact component={RegisterEstablishment} /> */}
                {/* <Route path='/login' component={Login} />
                <Route path='/register' exact component={RegisterEstablishment} /> */}
              
                {/* <Route path='/challenge' component={Challenge} /> */}

            {/* </BrowserRouter> */}
        {/* </Container> */}
    </section>
  );
}

export default withRouter(App);
