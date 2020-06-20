import React from 'react';
import { useState } from 'react'
import Feedback from './Feedback'
import registerUser from 'moove-it-client-logic'


export default function ({ onLogin }) {
    
    const [error, setError] = useState()

    function handleSubmit(event) {
        event.preventDefault()

        let { name, surname, email, password, passwordConfirmation } = event.target
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        passwordConfirmation = passwordConfirmation.value

        try {
            return registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => onLogin())
                .catch(error => setError(error.message))

        } catch ({ message }) {
            setError(message)
        }

    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onLogin()
    }

    return <section className="register"><h1>Register</h1>
        <form className="register__form" onSubmit={handleSubmit}>
            <input className="register__input" type="text" name="name" placeholder="name" required patern="[A-Za-z]{1,20}" />
            <input className="register__input" type="text" name="surname" placeholder="surname" required patern="[A-Za-z]{1,20}" />
            <input className="register__input" type="email" name="email" placeholder="e-mail" required />
            <input className="register__input" type="password" name="password" placeholder="password" required minLength="8" />
            <input className="register__input" type="password" name="passwordConfirmation" placeholder="confirm password" />
            <button className="register__butoon">Submit</button>
            <p className="register__paragraph">Not your first time? 
                <a href="#" className="register__anchor" onClick={handleGoToLogin}>Log in</a>
            </p>
            
            {error && <Feedback message={error} level='error' />}
        </form>
    </section>
}



