
import React from 'react';

function Register ({goToApp, onRegister}){

    return <section className="register">
        <h1>Register</h1>
        <form onSubmit={event => {event.preventDefault(); onRegister(event)}}>
            <input type="text" name="name" placeholder="name" required pattern="[A-Za-z]{1,20}" />
            <input type="text" name="surname" placeholder="surname" required pattern="[A-Za-z]{1,20}" />
            <input type="email" name="email" placeholder="e-mail" required />
            <input type="password" name="password" placeholder="password" required minLength="8" />
            <button>Submit</button>
            or <a href="" onClick={event => { event.preventDefault(); goToApp() }}>Landing</a>
        </form>
    </section>
}

export default Register;