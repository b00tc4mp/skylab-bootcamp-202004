import React from 'react';
import { useState } from 'react'
import Feedback from './Feedback'
import register from 'misc-logic-client'


export default function({onLogin}) { debugger
    const [error, setError] = useState()
    
    function handleSubmit(event){
        event.preventDefault()
        
        let { name, surname, email, password } = event.target
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            return register(name, surname, email, password)
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
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" required patern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required patern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <button>Submit</button>
            <a href="#" onClick={handleGoToLogin}>Log in</a> 
            {error && <Feedback message={error} level='error' />}
        </form>
    </section>
} 



 