
import React, {  useState } from 'react'
import Feedback from './Feedback'
import { authenticateUser } from 'plates-client-logic'
import './Login.sass'


export default function Login({onGoToRegister, onGoToHome}) {
    const [error, setError] = useState()

    const handleSubmit  = event => {
        event.preventDefault()

        let { email, password} = event.target

        email = email.value
        password = password.value

        try {
            authenticateUser(email, password)

            .then(token => onGoToHome(token))
            .catch(error => setError(error.message))
       } catch (error) {
           setError(error.message)        
        }
    }

        return (<>
                <section className="login">
                <div className="login__top">Login</div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input className="login__input" type="email" name="email" placeholder="e-mail" required />
                    <input className="login__input" type="password" name="password" placeholder="password" required minLength="6" />
                    <button className="login__button" >Submit</button>
                    <a className="login__register" href="" onClick={onGoToRegister}>Register</a>

                    {error &&  <Feedback message={error} level ="error"/> }
                </form>
            </section>
            </>)
        
        

}
