import React, { Component } from 'react'
import { retrieveUser } from 'misc-client-logic'

export default class extends Component {
    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token)
                .then(user => this.setState({ name: user.name }))
        } catch (error) {
            throw error
        }
    }

    render() {
        return <section className="home">
            <h1>Welcome, {this.state.name}!</h1>

            <button onClick={this.props.onLogout}>Logout</button>
        </section>
    }
}