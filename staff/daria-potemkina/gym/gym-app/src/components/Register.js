import React, { useState } from 'react'
import Feedback from './Feedback'
import './Feedback.sass'
import './Register.sass'
import { registerUser } from 'gym-client-logic'

export default function ({ onRegister, onGoToLogin }) {
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let { name, surname, email, password } = event.target

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

    return <section className='register'>
        <img className="register__logo" alt="logo" src="../Logo.png"></img>
        <h1 className="register__title" >Register</h1>
        <form className="register__form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" ></input>
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <section className="register__link">
                <button>Submit</button>
                <a href="/" onClick={handleGoToLogin}>Login</a>
            </section>
            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}