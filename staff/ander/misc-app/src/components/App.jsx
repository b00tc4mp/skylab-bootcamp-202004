import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Register from './Register';
import registerUser from 'misc-client-logic/register-user'
const { useState }  = React


function App() {
  const [view, setView ] = useState('app')
  const [error, setError] = useState(null)

  const goToRegister = event=>{event.preventDefault(); setView('register')}

  const goToApp = ()=>setView('app') 

  const handleRegister = ({target: form})=>{ // event.target.name.value
   
    const name = form.name.value
    const surname = form.surname.value
    const email = form.email.value
    const password = form.password.value
    registerUser(name, surname, email, password)
      .then(()=>setView('app'))
      .catch(error=>{setError(error)})
  }
  // return <>
  // {view === 'landing' && <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />}
 

  return <div className="App">
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
    <a 
      onClick = {goToRegister}
      className="App-link"
      href=""
    >
      Register
    </a>
  </header>
  <>
    {view === 'register' && <Register goToApp = {goToApp} onRegister = {handleRegister}/>}
    {error && <p>{error.message}</p>}
  </>

</div>
}

export default App;
