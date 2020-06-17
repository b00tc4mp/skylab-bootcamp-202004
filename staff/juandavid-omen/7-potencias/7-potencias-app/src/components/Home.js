import React, { useState, useEffect } from 'react'
import { retrieveUser } from '7-potencias-client-logic'
import './Home.sass'
import Feedback from './Feedback'
import './Feedback.sass'

export default function ({ token, onLogout }) {
  const [error, setError] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    try {
      retrieveUser(token)
        .then(name => setName(name))
        .catch(error => setError(error.message))
    } catch (message) {
      setError(message)
    }
  })

  return (
    <section className='home'>
      <h2 className='home__h2'>Welcome, {name}!</h2>

      <button className='home__btn' onClick={onLogout}>Logout</button>
      {error && <Feedback message={error} level='error' />}
    </section>
  )
}
