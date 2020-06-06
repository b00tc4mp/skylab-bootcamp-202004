import React, { useState } from 'react'
import Feedback from './Feedback'

const authenticateUser = require('misc-client-logic')



export default ({ onGoToRegister }) => {
    const [error, setError] = useState()

    const handleSubmit = function (event) {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password)
                .then(token => console.log(token))
                //onLogin(token)
                .catch(error => setError(error.message))

        } catch ({ message }) {
           setError(message)
        }
    }


const handleGoToRegister = function (event) {
    event.preventDefault()

    onGoToRegister()
}


return <section className="login">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="e-mail" required />
        <input type="password" name="password" placeholder="password" required minLength="8" />
        <button>Submit</button>
                or <a href="/" onClick={handleGoToRegister}>Register</a>

        {error && <Feedback message={error.message} level="error" />}
    </form>
</section>

}