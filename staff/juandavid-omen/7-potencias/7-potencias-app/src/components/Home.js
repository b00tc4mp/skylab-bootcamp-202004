import React, { useState, useEffect } from 'react'
import { retrieveUser } from '7-potencias-client-logic'
import './Home.sass'

export default function Home ({ token }) {
  const [error, setError] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    try {
      retrieveUser(token)
        .then(({ name }) => setName(name))
        .catch(error => setError(error.message))
    } catch ({ message }) {
      setError(message)
    }
  }, [token])

  return (
    <section className='home' />
  )
}
