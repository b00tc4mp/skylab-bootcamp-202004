import React from 'react';
import './App.css';
import Register from './Register';
import Landing from './Landing';
import Login from './Login';
import registerUser from 'misc-client-logic/register-user'
import authenticateUser from 'misc-client-logic/authenticate-user'

const { useState }  = React 

function App() {
  const [view, setView ] = useState('landing')
  const [token, setToken ] = useState(null)
  const [error, setError] = useState(null)

  const goToRegister = event=>{event.preventDefault(); setView('register')}
  const goToLanding = ()=>setView('landing') 
  const goToLogin = ()=>setView('login')

  const onRegister = ({target: form})=>{ // event.target.name.value
    const name = form.name.value

    const surname = form.surname.value
    const email = form.email.value
    const password = form.password.value
    registerUser(name, surname, email, password)
      .then(()=>setView('login'))

      .catch(error=>{setError(error)})
  }
    
  const onLogin = ({target: form})=>{
    const email = form.email.value

    const password = form.password.value
    authenticateUser(email, password)
      .then(token=>{setView('home'); setToken(token)})
      
      .catch(error=>{setError(error)})
  }

  return <div className="App">
    {view === 'landing' && <Landing goToRegister = {goToRegister} goToLogin = {goToLogin}/>}
    {view === 'register' && <Register goToLanding = {goToLanding} goToLogin = {goToLogin} handleRegister = {onRegister}/>}
    {view === 'login' && <Login goToLanding = {goToLanding} goToRegister = {goToRegister} handleLogin = {onLogin}/>}
    {error && <p>{error.message}</p>}
</div>
}

export default App;
