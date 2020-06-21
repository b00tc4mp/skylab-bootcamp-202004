import React, {useState} from 'react'
import Feedback from './Feedback'
import logo from '../images/animated-plane-v4-name&shadow.png'
import { registerUser } from 'moove-it-client-logic'
import './Register.sass'

export default function ({onRegister, onGoToLogin}) {
const [error, setError] = useState()

const handleSubmit = event => {
    event.preventDefault()
    
    let {name, surname, email, password, passwordValidation} = event.target

    name = name.value
    surname = surname.value
    email = email.value
    password = password.value
    passwordValidation = passwordValidation.value

    try {
        registerUser(name, surname, email, password, passwordValidation)
            .then(onRegister)
            .catch(error => setError(error.message))
    } catch({message}) {
        setError(message)
    }
}

const handleGoToLogin = event => {
    event.preventDefault()
    onGoToLogin()
}


    return <section className="register">
        <div className="register__logo">
            <img src={logo}></img>
        </div>
        <p className="register__description">Too tired and with no time to try layouts for your room?<br/><br/>Don't worry <b className="register__description-moove">Moove-it</b> does it for you.</p>
            <h1 className="register__title">Register</h1>
        <form className="register__form" onSubmit={handleSubmit}>
            <input className="register__input" type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input className="register__input" type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input className="register__input" type="email" name="email" placeholder="e-mail" required />
            <input className="register__input" type="password" name="password" placeholder="password" required minLength="8" />
            <input className="register__input" type="password" name="passwordValidation" placeholder="confirm password" required minLength="8" />
            <button>Submit</button>
            <p>We already meet? <a href="/" onClick={handleGoToLogin}>Login</a></p>

            {error && <Feedback message={error} level="error" />}
        </form>
    </section>
}