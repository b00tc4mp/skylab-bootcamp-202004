import React, {useState, useEffect} from 'react'
import './Login.sass'
import Feedback from './Feedback'
import {authenticate} from 'takemytask-client-logic'
import wave2 from './images/wave3.svg'
import wave1 from './images/wave4.svg'
import back from './images/back.svg'
import enter from './images/iniciar-sesion.svg'

export default function Register({onLogin, onGoToRegister, onGoToHome}) {

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

    return <section className="login">
            <div className="login__darkeffect">
            <img src={back} onClick={onGoToHome}></img>
            </div>

            <div className="login__wavedark">
                <img src={wave1}></img>
            </div>

            <div className="login__wavelight">
                <img src={wave2}></img>
            </div>
            <form onSubmit = {handleSubmit}>
                <h1>Welcome<br/>Back</h1>
                <br/>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <br/>
                <button>Sign in<img src={enter}></img></button>
                <br/>
                <a href="" onClick={handleGoToRegister}>Register</a>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
}