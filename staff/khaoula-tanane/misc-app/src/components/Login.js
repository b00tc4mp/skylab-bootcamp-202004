import React, { useState } from 'react'
import { authenticateUser } from 'misc-client-logic'

export default function () {
    const [error, setError] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()

        let { email, password } = event.target
        email = email.value
        password = password.value

        try{
          authenticateUser(email, password)
            .then(console.log('kau'))
            .catch(error=> setError(error))
        } catch ({message}){
            setError(message)
        }
    }

        return <section className="login">
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input  name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required />
            <button type='submit'>Submit</button>
             or <a href="" onClick={event => {
                event.preventDefault()
               }}>Register</a>
        </form>
    </section>
}
