import React, { useState } from "react";
import './Login.sass'
import { Link } from 'react-router-dom'
import logo from '../images/logo-lagranja.png'
import { authenticateUser } from 'termometro-client-logic'
import Feedback from './Feedback'

function Login({onLogin}) {

  const [error, setError] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    let { email, password } = event.target

    email = email.value
    password = password.value

    try {
      authenticateUser(email, password)
        .then((token)=> onLogin(token))
        .catch(error => setError(error.message))
    } catch (error) {
      if(error) throw error
    }

  }

  return (
    <section className='loginContainer'>
      <img src={logo} className='loginContainer__logo'></img>
      <h1 className='loginContainer__title'>El termometro del autoestima</h1>
        <span className='loginContainer__loginText'>Alguien de mi familia ya me ha registrado:</span>
      <form className='loginContainer__form' onSubmit={handleSubmit}>
        <input type="email" name="email" className='loginContainer__emailInput' placeholder='Email' required></input>
        <input type="password" name="password" className='loginContainer__passInput' placeholder='Contraseña' required minLength="8"></input>
        <button className='loginContainer__loginButton'>
          <span className='loginContainer__loginButton--text'>¡Entra!</span>
        </button>
        {error && <Feedback message={error} level="error" />}
      </form>
      <span className='loginContainer__registerText'>Quiero crear mi propia familia:</span>
      <Link to={'/register'} className='loginContainer__registerButton'>
        <span className='loginContainer__registerButton--text'>¡Crea tu familia!</span>
      </Link>
    </section>
  );
}

export default Login;
