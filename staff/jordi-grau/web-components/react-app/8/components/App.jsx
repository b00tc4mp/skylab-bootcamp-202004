import { useCallback } from "react"

const { Component } = React

class App extends Component {
    constructor() {  //props
        super()

        this.state = {
            view: 'home'
        }
    }
    // metodos
    handleGoToRegister = () => this.setState({ view: 'register' })

    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password, () => this.setState({ view: 'login' }))
       
    }

    handleLogin =(email, password) => {
        authenticateUser (email, password)
    }

    render() { // to display
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} />}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} toRegister={this.handleGoToRegister} />} 
            {this.state.view === 'home' && <Home name="Pepito" />}

            {this.state.view === 'login' && <Smart view={this.state.view} />}
        </>
    }
 
}