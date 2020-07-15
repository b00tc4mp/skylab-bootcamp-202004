import React, { useState } from 'react'
import './App.sass'
import Register from './Register'
import Login from './Login'
import Home from './Home'


export default function App() {

  const [view, setView] = useState('register')
  const [token, setToken] = useState()


  const handleGoToLogin = () => setView('login')

  const handleLogin = (token) => {
    sessionStorage.token = token
    setView('home')
    setToken(token)
  }

  const handleGoToRegister = () => setView('register')



  return (
    <div className="App">
      <header className="App-header">
        {view === 'register' && <Register goToLogin={handleGoToLogin} />}
        {view === 'login' && <Login goToRegister={handleGoToRegister} onSubmit={handleLogin}/>}
        {view === 'home' && <Home token={token} onLogout={handleGoToRegister} />}
      

      </header>
    </div>
  )

}
