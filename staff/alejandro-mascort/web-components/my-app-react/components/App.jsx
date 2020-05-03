const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: "landing",
            name: undefined,
            token: undefined,
            following: []
        }
    }

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleLogin = (name, token, following) => {
        this.setState({ view: 'home', name, token})
        if (following) this.setState({following})
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleRegister = () => {this.setState({ view: 'login' })}

    handleGoToHome = () => this.setState({ view: 'home' })

    handleGoToLanding = () => this.setState({ view: 'landing' })

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onLogin={this.handleGoToLogin} onRegister={this.handleGoToRegister} />}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'home' && <Home name={this.state.name} token={this.state.token} following={this.state.following} onLogout={this.handleGoToLanding} />}
        </>
    }
}