import React, { useState } from 'react'
import Feedback from './Feedback'
import { registerUser } from 'plates-client-logic'
import './Register.sass'
import registerImage from '../assets/dishes-landing-04.jpg'




export default function Register({ history, onGoToLogin }) {

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
                .then(() => onGoToLogin(event))
                .catch(error => setError(error.message))
        } catch ({ message }) {
            setError(message)
        }
    }


    return <div className="register">
        <div className="register__top">Register</div>
            <div className="register__container">
                 <form className="register__form" onSubmit={handleSubmit}>             
                    <input className="register__input" type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
                    <input className="register__input" type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
                    <input className="register__input" type="email" name="email" placeholder="e-mail" required />
                    <input className="register__input" type="password" name="password" placeholder="password" required minLength="8" />
                    <button className="register__button" >Submit</button>
                    <a  className="register__login" href="" onClick={onGoToLogin}>Login</a>              
                    {error && <Feedback message={error} level="error" />}
                </form>
            </div>
        </div>
       
 
}




