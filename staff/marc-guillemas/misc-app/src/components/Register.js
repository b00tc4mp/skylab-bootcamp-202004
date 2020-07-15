/* eslint-disable no-unused-expressions */

import React from 'react'
import './Register.sass'
// import { register } from '../src copy/serviceWorker'
import { registerUser } from 'misc-client-logic'
import {useState} from 'react'
 
export default function ({onChangeView}) {
    const [error, setError] = useState(undefined)

    function handleOnSubmit(event) {
        event.preventDefault()

        let { name, surname, email, password } = event.target
        debugger
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            return registerUser(name, surname, email, password)
                .then(() => console.log('registered!'))
                .catch((error) => setError(error))
        } catch (error) {
            setError(error.message)
        }
    }

    // const handleGoToLogin = () => {

    // }


    return <section onSubmit={handleOnSubmit} className="Register">
        <form>
            <input type="text" name="name"></input>
            <input type="text" name="surname"></input>
            <input type="text" name="email"></input>
            <input type="text" name="password"></input>
            <a href="" onClick={event => {
                event.preventDefault()
                onChangeView('login')
                }}>Login</a>
            <button>Submit</button>
        </form>

    </section>
}

