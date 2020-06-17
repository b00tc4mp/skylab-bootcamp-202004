import React, {useState, useEffect} from 'react'
// import './register.sass'
import Feedback from './Feedback'
import {authenticate} from 'takemytask-client-logic'

export default function Register({onLogin, onGoToRegister}) {

    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        console.log('onsumbmit')
        event.preventDefault()
        let { password, email} = event.target

        email = email.value
        password = password.value

        try {
            setError('')
            authenticate(email, password)
                .then(onLogin) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const handleGoToRegister= (event) => {
        event.preventDefault()
        onGoToRegister()
    }

    return <section className="Login">
            <form onSubmit = {handleSubmit}>
                <h1>Login</h1>
                <br/>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <br/>
                <button>Submit</button>
                <br/>
                or <a href="" onClick={handleGoToRegister}>Register</a>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
}