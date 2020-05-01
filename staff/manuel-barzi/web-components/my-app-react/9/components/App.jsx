const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleRegister = () => this.setState({ view: 'login' })

    handleLogin = token => this.setState({ token, view: 'home' })

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleLogout = () => this.setState({ token: undefined, view: 'landing'})

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onGoToRegister={this.handleGoToRegister} onGoToLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onRegister={this.handleRegister} onGoToLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onLogin={this.handleLogin} onGoToRegister={this.handleGoToRegister} />}
            {this.state.view === 'home' && <Home token={this.state.token} onLogout={this.handleLogout}/>}
        </>
    }
}