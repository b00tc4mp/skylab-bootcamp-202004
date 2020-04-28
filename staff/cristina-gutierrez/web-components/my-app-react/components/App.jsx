const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            user: ''
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    handleGoToLanding = () => this.setState({ view: 'landing'})

    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password)

        this.setState({ view: 'login'})
    }

    handleLogin = (email, password) => {
        authenticateUser(email, password)

        this.setState({ view: "home", user: retrieveUser(email) })
    }
    
    render() {  
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onLogin={this.handleGoToLogin}/>}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onRegister={this.handleGoToRegister}/>}
            {this.state.view === 'home' && <Home name={this.state.user.name} onLogout={this.handleGoToLanding} />}
        </>
    }
}