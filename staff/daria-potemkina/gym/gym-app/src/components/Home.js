import React, { Component } from 'react'
import { Route, withRouther, Redirect } from 'react-router-dom'
import { retrieveUser, retrieveFutures, retrieveOptions } from 'gym-client-logic'
import Futures from './Futures'
import Options from './Options'
import './NavBar.sass'
import './Home.sass'

export default class extends Component {
    constructor() {
        super()

        this.state = {
            name: undefined,
            error: undefined,
            futures: undefined,
            options: undefined
        }
    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token)
                .then(user => this.setState({ name: user.name }))
        } catch (error) {
            this.setState({ error: error.message })
        }

        try {
            retrieveFutures()
                .then(futures => this.setState({ futures }))
        } catch (error) {
            this.setState({ error: error.message })
        }

        try {
            retrieveOptions()
                .then(options => this.setState({ options }))
        } catch (error) {
            this.setState({ error: error.message })
        }
    }

    render() {
        return <section className="home">
            <nav className="nav-bar">
                <input alt="button" type="image" src="/logo-mini.png" className="nav-bar__button"></input>
                <ul className="nav-bar__list nav-bar__list--open">
                    <li><a href="/"> Home</a></li>
                    <li><a href="/">Portfolio</a></li>
                    <li><a href="/">Notifications</a></li>
                    <li><a href="/">Account</a></li>
                    <li><a href="/">Settings</a></li>
                    <li><a href="/" onClick={this.props.onLogout}>Logout</a> </li>
                </ul>
                <button className="nav-bar__button">|||</button>
            </nav>

            <h1>Welcome, {this.state.name}!</h1>
            <h1>Futures</h1>
            {this.state.futures && <Futures futures={this.state.futures} />}
            <h1>Options</h1>
            {this.state.options && <Options options={this.state.options} />}
        </section>
    }
}