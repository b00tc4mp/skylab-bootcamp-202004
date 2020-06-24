import './Register.sass'
import {registerEstablishment} from 'qrmenu-client-logic'
import React, {useState} from 'react'
import Feedback from './Feedback'

export default function ({onRegister, onGoToLogin}) {

    
    const [error, setError] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let {establishment, nif, email, password} = event.target

        establishment = establishment.value
        nif = nif.value
        email = email.value
        password = password.value

        try {
            registerEstablishment(establishment, nif, email, password)
            .then(() => onRegister())
            .catch(error => setError(error))

        } catch ({message}) {
            setError(message)
        }
    }
    
    const handleGoToLogin = event => {
        event.preventDefault()
        
        onGoToLogin()
    }

    return  <section className="register">
        <h2 className="register__header">Register</h2>
        <form onSubmit={handleSubmit} className="register__form" >      
            <label htmlFor="establishment">Establishment Name</label>          
            <input className="register__input" type="text" name="establishment" placeholder="John's Restaurant" />
            
            <label htmlFor="nif">NIF</label>
            <input className="register__input" type="text" name="nif" placeholder="12345678A" />
            
            <label htmlFor="email">Email</label>
            <input className="register__input" type="email" name="email" placeholder="john@doe.com" />
            
            <label htmlFor="password">Password</label>
            <input className="register__input" type="password" name="password" placeholder="********" />
            
            <a href="" className="register__tologin" onClick={handleGoToLogin}>Already registered? Sign In now! </a>
            <button className="register__button">Register</button>
        </form>

        {error && <Feedback message={error} level="error"/> }
    </section> 
}