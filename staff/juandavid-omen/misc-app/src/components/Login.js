import React, { useState } from 'react'
import Feedback from './Feedback'
import './Register.sass'
import { authenticateUser} from 'misc-client-logic'

 export default function({ onLogin, onGoToRegister }) {
    const [error, setError] = useState()
    
    const handleSubmit = event => {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) return setError(error.message)
                
                onLogin(token)
            })
        } catch ({ message }) {
            setError(message)
        }
    }

    const handeGoToRegister = event => {
        event.preventDefault()
    
        onGoToRegister()
    }

    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="6" />
            <button>Submit</button>
                {" "} or {" "} <a href="" onClick={handeGoToRegister}>Register</a>
            
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}