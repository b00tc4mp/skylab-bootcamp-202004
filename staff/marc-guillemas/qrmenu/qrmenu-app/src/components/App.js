import React, {useState, useEffect} from 'react';
import Register from './RegisterEstablishment'
import './App.css';
import { Route, withRouter, Redirect } from 'react-router-dom'
import checkAuthentication from 'qrmenu-client-logic';

function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Route path="/register" render={() => 
            token? <Redirect to="/home"/> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin}/>
          } />
        </Container>
      </header>
    </div>
  );
}

export default withRouter(App);
