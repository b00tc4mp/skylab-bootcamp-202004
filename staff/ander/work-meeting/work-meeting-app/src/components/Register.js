import React, { useState } from 'react'
import Feedback from './Feedback'
import logo from '../assets/logo1.png'
import { registerUser } from 'work-meeting-client-logic'
import "./Register.sass"

export default function ({ onRegister, onGoToLogin }) {
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target
        debugger
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, email, password)
                .then(onRegister)
                .catch(error => setError(error.message))
        } catch ({ message }) {
            setError(message)
        }
    }

    const handleGoToLogin = event => {
        event.preventDefault()

        onGoToLogin()
    }

    return <section className="register">
        <img className='register__image' src={logo}></img>
        <fieldset className="register__form">
        <legend>Register</legend> 
        
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name " required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname " required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail " required />
            <input type="password" name="password" placeholder="password " required minLength="8" />
            <button>Submit</button>
                <a href="/" onClick={handleGoToLogin}>Login</a>
            
            {error && <Feedback message={error} level="error" />}
        </form>
        
        </fieldset>
    </section>
}