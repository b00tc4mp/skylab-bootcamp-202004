import React, { useState, useEffect } from 'react'
// import './App.css'
import Container from './Container'
import Register from './Register'
import { Route, withRouter, Redirect } from 'react-router-dom'

function App({history}) {

  const [token, setToken] = useState()

  // const handleLogout = () => {
  //   setToken()
  //   delete sessionStorage.token

  //   history.push('/')
  // }

  const handleRegister = () => history.push('/login')

  const handleGoToLogin = () => history.push('/login')

  return (
    <div className="App">
      <header className="App-header">
        {/* <Hello name="Manuel" /> */}

        <Container>

          <Route path="/register" render={() =>
            token ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />
          } />

        </Container>
      </header>
    </div>
  )
}

export default withRouter(App)
