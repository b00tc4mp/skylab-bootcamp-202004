/* eslint-disable no-unused-expressions */
import Feedback from './Feedback'
import React from 'react'
import './Register.sass'
import {registerUser} from 'misc-client-logic'

const { useState } = React


export default function () {

    const [error, setError] = useState()

    function handleOnSubmit(event) {
        event.preventDefault()

        let { name, surname, email, password } = event.target
        debugger
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, email, password)
                .then(() => console.log('ok'))
                .catch(error => setError(error.message))
        } catch ({message}) {
            setError(message)

        }
    }

    return <section onSubmit={handleOnSubmit} className="Register">
        <form>
            <input type="text" name="name"></input>
            <input type="text" name="surname"></input>
            <input type="text" name="email"></input>
            <input type="text" name="password"></input>
            <button>Submit</button>
        </form>

{error && <Feedback  message ={error} level = {error}/>}
    </section>
}

