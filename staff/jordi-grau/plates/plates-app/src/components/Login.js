import React, {  useState } from 'react'
import Feedback from './feedback'
import { authenticateUser } from 'plates-client-logic'

export default function Login({onGoToRegister, onGoToHome}) {
    const [error, setError] = useState()

    const handleSubmit  = event => {
        event.preventDefault()

        let { email, password} = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password)
            .then(() => onGoToHome(event))
            .catch(error => setError(error.message))
        } catch (error) {
           setError(error.message)        
        }
    }

        return <section className="login">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="e-mail" required />
                    <input type="password" name="password" placeholder="password" required minLength="6" />
                    <button>Submit</button>
                    or <a href="" onClick={onGoToRegister}>Register</a>

                    {error &&  <Feedback message={error} level ="error"/> }

                </form>
            </section>
        
        
}
