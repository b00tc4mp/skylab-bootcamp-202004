const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    handleGoToHome = () => this.setState({view: 'home'})


    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password)

        this.setState({ view: 'login' })
    }

    handleLogin = (email, password) => {
        authenticateUser(email, password)

        this.setState({view: 'home'})
    }

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} />}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} />}


        </>
    }
}