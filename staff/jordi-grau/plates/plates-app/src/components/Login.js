
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

            .then(this.props.onLogin)
            .catch(error => this.setState({ error: error.message}))
        } catch (error) {
            this.setState({ error:message})
            
        }
    }

    handleGotoRegister = event =>{
        event.preventDefault()

        this.props.onGoToRegister
    }

    render() {
        return 
            <section className="login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="e-mail" required />
                    <input type="text" name="password" placeholder="password" required minLength="6" />
                    <button>Submit</button>
                    or <a href="" onClick={this.handleGotoRegister}>Register</a>

                    {this.state.error &&  <Feedback message={this.state.error} level ="error"/> }

                </form>
            </section>
        
    }




