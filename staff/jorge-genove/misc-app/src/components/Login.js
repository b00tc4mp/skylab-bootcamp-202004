import React from 'react'
import {authenticateUser} from 'misc-client-logic'
import { useState } from 'react'

export default function({onChangeView}) {
    const [error, setError] = useState(undefined)
    
    function handleSubmit(event) {debugger
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            return authenticateUser(email, password)
                .then(token => console.log(token))
                .catch(error => setError(error.message))
                // retrieveUser(token, (error) => {
                //     if (error) return setError(error.message)
                //     else onSubmit(token)
                // })

        } catch ({ message }) {
            setError(message)
        }
    }

    function handleGoToRegister(event) {
        event.preventDefault()

        onChangeView('register')
    }

    return <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password"/>
            <button>Submit</button>
            <a href="" onClick={handleGoToRegister}>Register</a>
            {/* {error && <Feedback message={error} level='error' />} */}
        </form>
    </section>
}