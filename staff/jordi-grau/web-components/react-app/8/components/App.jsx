// import { useCallback } from "react"

const { Component } = React

class App extends Component {
    constructor() {  //props
        super()

        this.state = {
            view: 'landing', 
            _token: undefined
        }
    }
    // metodos
    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({view: 'login'})
    

    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password, () => this.setState({ view: 'login' }))
       
    }

    handleLogin =(email, password) => {
        authenticateUser (email, password, (error, token) => {
            if (error === undefined) { 
                this.setState( { _token: token } )
                this.setState( {view: 'home'})

            } else
                throw new Error(console.error(error)) 
        })
      
        
    }

    

    render() { // to display
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} toLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} toRegister={this.handleGoToRegister}   />} 
            {this.state.view === 'home' && <Home token = {this.state._token} name="Pepito" />}

            {this.state.view === 'login' && <Smart view={this.state.view} />}
        </>
    }
 
}