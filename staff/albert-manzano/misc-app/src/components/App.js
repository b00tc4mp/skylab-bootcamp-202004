import React, { useState }  from 'react'

import './App.sass'

import Landing from './Landing'
import Register from './Register'
import Login from './Login'
import Home from './Home'

function App() {

  const [view,setView] = useState ('landing')
  const [token, setToken] = useState() 

  function handleGoToRegister() {
    setView('register')
  }

  function handleRegister() {
    setView('login')
  }

  function handleGoToLogin() {
    setView('login')
  }

  function handleLogin (token) {
    sessionStorage.token = token
    setToken(token)
    setView('home')
}

  return (<>
    {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
    {view === 'register' && <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />}
    {view === 'login' && <Login onGoToRegister={handleGoToRegister} onLogin={handleLogin}/>}
    {view === 'home' && <Home  />}
  </>
  )
}

export default App
