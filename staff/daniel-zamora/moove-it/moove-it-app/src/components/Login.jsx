import React from 'react';
import { useState } from 'react'
import Feedback from './Feedback'
import {authenticateUser} from 'moove-it-client-logic'


export default function({ onRegister, onGoToHome}) {
    const [error, setError] = useState(undefined)
    
    function handleSubmit(event) {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            return authenticateUser(email, password)
                .then(token => onGoToHome(token))
                .catch(error => setError(error.message))
             
        } catch ({ message }) {
            setError(message)
        }
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onRegister()
    }

    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <button>Submit</button>
            <a href="#" onClick={handleGoToRegister}>Register</a>
            {error && <Feedback message={error} level='error' />}
        </form>
    </section>
}