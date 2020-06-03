import React from 'react'

import './Register.sass'
import { registerUser } from 'misc-client-logic'

export default function ({goToLogin}) {

    function handleOnSubmit(event) {
        event.preventDefault()

        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            return registerUser(name, surname, email, password)
                .then((response) => response ? console.log(response): goToLogin())
                .catch(error => console.error('KO', error))
        } catch (error) {
            console.log(error)
        }
    }

    return <section  className="Register">
        <form onSubmit={handleOnSubmit}>
            <input type="text" name="name"></input>
            <input type="text" name="surname"></input>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
            <button>Submit</button>
        </form>
        <a href="" onClick={ event => {
            event.preventDefault()
            goToLogin()
        }
            }>Login</a>

    </section>
}