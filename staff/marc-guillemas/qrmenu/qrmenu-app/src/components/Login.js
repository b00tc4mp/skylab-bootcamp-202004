
import React, {useState} from 'react'
import './Login.sass'
import {authenticate} from 'qrmenu-client-logic'
import Feedback from './Feedback'
import { set } from '../../../qrmenu-api/node_modules/qrmenu-data/models/schemas/dish'


export default function ({onLogin, onGoToRegister}) {

    const [error, setError] = useState()

    const handleGoToRegister = event => {
        event.preventDefault()

        onGoToRegister()
    }

    const handleSubmit = event => {
        event.preventDefault()

        let {nif, email, password} = event.target

        nif = nif.value
        email = email.value
        password = password.value

        try {
            
            authenticate(nif, email, password)
                .then(token => onLogin(token))
                .catch(({message}) => setError(message))
                
        } catch ({message}) {
            
            setError(message)
        }
    }

    return <section className="login">
        <h2 className="login__header">Login</h2>
        <form onSubmit={handleSubmit} className="login__form" >      
            <label htmlFor="nif">NIF</label>
            <input className="login__input" type="nif" name="nif" placeholder="12345678A" />
            <label htmlFor="email">Email</label>
            <input className="login__input" type="email" name="email" placeholder="john@doe.com" />
            <label htmlFor="password">Password</label>
            <input className="login__input" type="password" name="password" placeholder="********" />
            <a href="" className="login__toregister"onClick={handleGoToRegister}>Not a member yet? Register now!</a>     
            <button className="login__button">Login</button>
        </form>
        {error && <Feedback message={error} level="error"/> }
    </section> 
}