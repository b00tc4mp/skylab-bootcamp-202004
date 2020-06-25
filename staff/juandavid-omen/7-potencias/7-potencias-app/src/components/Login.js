import React, { useState } from 'react'
import './Login.sass'
import Feedback from './Feedback'
import './Feedback.sass'
import { loginUser } from '7-potencias-client-logic'

export default function ({ onLogin, onGoToRegister }) {
  const [error, setError] = useState()

  const handleSubmit = event => {
    event.preventDefault()
    let { email, password } = event.target

    email = email.value
    password = password.value

    try {
      loginUser(email, password)
        .then(onLogin)
        .catch(error => setError(error.message))
    } catch (message) {
      setError(message)
    }
  }

  const handleGoToRegister = event => {
    event.preventDefault()

    onGoToRegister()
  }
  return (
    <section className='login'>
      <form className='login__container' onSubmit={handleSubmit}>
        <h2 className='login__h2'>Log Into 7 Potencias </h2>
        <input className='login__input' type='email' name='email' placeholder='e-mail' required />
        <input className='login__input' type='password' name='password' placeholder='password' required minLength='8' />
        <button className='login__log'>Log in</button>
        {error && <Feedback message={error} level='error' />}
        <button className='login__newAccount' onClick={handleGoToRegister}>Create New Account</button>
      </form>
    </section>
  )
}
