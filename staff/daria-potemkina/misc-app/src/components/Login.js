import React, { useState } from 'react'
import './Login.sass'
import { authenticateUser } from 'misc-client-logic'

export default function ({ goToRegister, onSubmit }) {
    const [error, setError] = useState('')
    
    function handleOnSubmit(event) {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            return authenticateUser(email, password)
                .then(token => {
                    onSubmit(token)
                })
                .catch(error => setError(error))
        } catch (error) {
            setError(error)
        }
    }

    return <section className="Login">
        <form onSubmit={handleOnSubmit}>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
            <button>Submit</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()
            goToRegister()
        }
        }>Register</a>

    </section >
}