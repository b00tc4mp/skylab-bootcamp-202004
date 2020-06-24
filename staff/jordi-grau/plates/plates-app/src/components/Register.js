import React, {useState} from 'react'
import Feedback from './Feedback'
import { registerUser} from 'plates-client-logic'


export default function Register({ history, onGoToLogin}) {

    const [error, setError] = useState() //HOOHKS
 
    const handleSubmit = event => {
        event.preventDefault()

        let {name, surname, email, password} = event.target
        
        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, email, password)
            .then(() => onGoToLogin(event))
            .catch(error => setError(error.message))
        } catch ({message}) {
            setError(message)
        }
    }        


    return <section className="register">
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
        <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
        <input type="email" name="email" placeholder="e-mail" required />
        <input type="password" name="password" placeholder="password" required minLength="8" />
        <button>Submit</button>
        or <a href="" onClick={onGoToLogin}>Login</a>

        {error && <Feedback message={error} level="error" />}
    </form>
</section>
}
    
    


