import React, { useState } from 'react'
import './App.sass'
import Register from './Register'
import Login from './Login'


export default function App() {

  const [view, setView] = useState('register')


  const handleGoToLogin = () => setView('login')

  const handleGoToRegister = () => setView('register')


  return (
    <div className="App">
      <header className="App-header">
        {view === 'register' && <Register goToLogin={handleGoToLogin} />}
        {view === 'login' && <Login goToRegister={handleGoToRegister} />}
        {/* {view === 'home' && <Home onLogout={handleGoToRegister} />} */}
      

      </header>
    </div>
  )

}

