import React, { useState } from 'react'
import Feedback from './Feedback'
import './Register.sass'
import { registerUser } from '7-potencias-client-logic'

export default function ({ onRegister, onGoToLogin }) {
  const [error, setError] = useState()

  const handleSubmit = event => {
    event.preventDefault()

    let { name, surname, email, password } = event.target

    name = name.value
    surname = surname.value
    email = email.value
    password = password.value

    try {
      registerUser(name, surname, email, password)
        .then(onRegister)
        .catch(error => setError(error.message))
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleGoToLogin = event => {
    event.preventDefault()

    onGoToLogin()
  }

  return (
    <section className='register'>
      <form className='register__container' onSubmit={handleSubmit}>
        <h2 className='register__h2'>Create an account</h2>
        <input className='register__input' type='text' name='name' placeholder='name' required pattern='[A-Za-z]{1,20}' />
        <input className='register__input' type='text' name='surname' placeholder='surname' required pattern='[A-Za-z]{1,20}' />
        <input className='register__input' type='email' name='email' placeholder='e-mail' required />
        <input className='register__input' type='password' name='password' placeholder='password' required minLength='8' />
        <button className='register__singUp'>Sign Up</button>
        {error && <Feedback message={error} level='error' />}
        <button className='register__toLogin' onClick={handleGoToLogin}>Log Into Existing Account</button>
      </form>
    </section>
  )
}
