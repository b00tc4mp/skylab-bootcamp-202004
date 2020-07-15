import React from 'react';
import './App.sass';
import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';


function App() {
  const [view, setView] = useState('register')
  const [token, setToken] = useState()

  function handleGoToLogin() {
      setView('login')
  }

  function handleGoToRegister() {
    setView('register')
  }

  function handleGoToHome(token) {
    setToken(token)
    setView('home')
  } 

  return  <>
    {view === 'register' && <Register onLogin={handleGoToLogin} />}
    {view === 'login' && <Login onRegister={handleGoToRegister} onGoToHome={handleGoToHome} />}
    {view === 'home' && <Home token={token}/>}
  </>
}

export default App;

