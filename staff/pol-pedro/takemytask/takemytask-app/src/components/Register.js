import React, {useState, useEffect} from 'react'
import './Register.sass'
import Feedback from './Feedback'
import {registerUser} from 'takemytask-client-logic'
import wave2 from './images/wave3.svg'
import wave1 from './images/wave4.svg'
import back from './images/back.svg'
import enter from './images/iniciar-sesion.svg'
import { useTransition, animated } from 'react-spring'

export default function Register({onRegister, onGoToLogin, onGoToHome}) {

    const [error, setError] = useState('')
    

    const handleSubmit = (event) => {
        event.preventDefault()
        let { name, surname, email, password, adress } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value
        adress = adress.value

        try {
            setError('')
            registerUser(name, surname, email, password, adress)
                .then(onRegister) 
                .catch(error => setError(error.message))
        }catch({message}){
            setError(message)
        }
    }

    const handleGoToLogin= (event) => {
        event.preventDefault()
        onGoToLogin()
    }

    const handelInput = () => {
        setError('')
    }

    return <section className="register">

            <div className="register__darkeffect">
            <img src={back} onClick={onGoToHome}></img>
            </div>

            <div className="register__wavedark">
                <img src={wave1}></img>
            </div>

            <div className="register__wavelight">
                <img src={wave2}></img>
            </div>
            <form onSubmit = {handleSubmit} onInput={handelInput}>
                <h1>Creat<br></br>Account</h1>
                <br/>
                <input type="text" name="name" placeholder="Name" required pattern="[A-Za-z]{1,20}" />
                <input type="text" name="surname" placeholder="Surname" required pattern="[A-Za-z]{1,20}" />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required minLength="8" />
                <input type="text" name="adress" placeholder="Adress" />
                <br/>
                <button>Sign up <img src={enter}></img> </button>
                <br/>
                <a href="" onClick={handleGoToLogin}>Login</a>
                {error && <Feedback message={error} level="error" />}
            </form>
        </section>
}