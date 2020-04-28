const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            user: null
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    
    handleLoginSubmit = ( email, password) => {
       authenticateUser(email, password)
       this.setState({view: 'home'})
    }

    handleRegisterSubmit = (name, surname, email, password) => {
        registerUser( name, surname, email, password)
        this.setState({view: 'login'})
    }
    
    
    render() {
        return <>
            {this.state.view === 'landing' && <Landing onLogin={this.handleGoToLogin} onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register onRegisterSubmit={this.handleRegisterSubmit} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onLoginSubmit={this.handleLoginSubmit} onRegister={this.handleGoToRegister} />}
            {this.state.view === 'home' && <Home user={this.state.user}/>}

        </>
    }
    
}
