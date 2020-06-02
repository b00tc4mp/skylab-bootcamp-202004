import React from 'react';
import logo from './logo.svg';
import './App.sass';
import { useState } from 'react';
import Register from './components/Register';

function App() {
  const [view, setView] = useState('register')

  function handleGoToLogin() {
      setView('success')
  }

  return  <>
    {view === 'success' && (<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>)}
    {view === 'register' && <Register onLogin={handleGoToLogin} />}
  </>
}

export default App;

// return <>
//         {view === 'spinner' && <Spinner />}
//         {view === 'landing' && <Landing onLogin={handleGoToLogin} onRegister={handleGoToRegister} />}
//         {view === 'login' && <Login onSubmit={handleLogin} onRegister={handleGoToRegister} />}
//         {view === 'register' && <Register onLogin={handleGoToLogin} />}
//         {view === 'home' && <Home token={token} onLogout={handleGoToLanding} onLogin={handleGoToLogin}/>}
//     </>
