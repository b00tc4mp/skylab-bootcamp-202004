import React, { Component } from 'react'
import Feedback from './Feedback'
import './Feedback.sass'
import './Login.sass'
import { loginUser } from 'gym-client-logic'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { error: '' }
    }

    handleSubmit = event => {
        event.preventDefault()

        let { email, password } = event.target

        email = email.value
        password = password.value

        try {
            loginUser(email, password)
                .then(this.props.onLogin)
                .catch(error => this.setState({ error: error.message }))
        } catch ({ message }) {
            this.setState({ error: message })
        }
    }

    handeGoToRegister = event => {
        event.preventDefault()

        this.props.onGoToRegister()
    }

    render() {
        return <section className="login">
            <img className = "login__logo" alt="logo" src="../Logo.png"></img>
            <h1 className="login__title">Login</h1>
            <form className="login__form" onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="e-mail" required />
                <input type="password" name="password" placeholder="password" required minLength="8" />
                <section className = "login__link">
                <button>Submit</button>
                <a href="/" onClick={this.handeGoToRegister}>Register</a>
                </section>
                {this.state.error && <Feedback message={this.state.error} level="error" />}
            </form>
        </section>
    }
}