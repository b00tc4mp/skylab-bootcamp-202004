const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            name: undefined,
            token: undefined,
            following: []
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleRegister = () => this.setState({ view: 'login' })

    handleLogin = (name, token, following) => {
        this.setState({ name, token, view: 'home' })
        if (following) this.setState ({ following })
    }

    handleLogout = () => this.setState({ token: undefined, view: 'landing'})

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onGoToRegister={this.handleGoToRegister} onGoToLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onGoToLogin={this.handleGoToLogin}/>}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onGoToRegister={this.handleGoToRegister}/>}
            {this.state.view === 'home' && <Home name={this.state.name} following={this.state.following} token={this.state.token} onLogout={this.handleLogout} />}
        </>
    }
}