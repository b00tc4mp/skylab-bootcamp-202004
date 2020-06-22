import React, {useState} from 'react';
import Feedback from './Feedback';
import './Login.sass'
import logo from '../images/animated-plane-v4-name&shadow.png';
import { authenticateUser } from 'moove-it-client-logic';


export default function Login({onLogin, onGoToRegister}){
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password)
                .then(onLogin()) 
                .catch(error => setError(error.message))
        } catch ({message}) {
            setError(message)
        }
    }

    const handleGoToRegister = event => {
        event.preventDefault()
        onGoToRegister()
    }
    return <section className="login">
        <div className="login__container">
    <div className="login__logo">
            <img src={logo}></img>
        </div>
            <h1 className="login__title">login</h1>
    <form className='login__form' onSubmit={handleSubmit}>
        <input className="login__input" type="email" name="email" placeholder="e-mail" required />
        <input className="login__input" type="password" name="password" placeholder="password" required minLength="8" />
        <button>Submit</button>
        <p>First Time? <a href="" onClick={handleGoToRegister}>Register</a></p>

        {error && <Feedback message={error} level="error" />}
    </form>
    </div>
</section>
}
