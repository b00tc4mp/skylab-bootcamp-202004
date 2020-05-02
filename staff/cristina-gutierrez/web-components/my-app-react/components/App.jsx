const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            user:  {
                name: 'Cristina',
                surname: 'Guti',
                email: 'Cristgu@gmail.com',
                password: '123123123',
                tweets: [{
                    message: 'Hola, Mundo!',
                    date: new Date
                }],
                following: ['pepito@grillo.com']
            }
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleRegister = () => this.setState({ view: 'login' })

    handleLogin = token => this.setState({ token, view: 'home' })

    handleLogout = () => this.setState({ token: undefined, view: 'landing'})

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onGoToRegister={this.handleGoToRegister} onGoToLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onGoToLogin={this.handleGoToLogin}/>}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onGoToRegister={this.handleGoToRegister}/>}
            {this.state.view === 'home' && <Home token={this.state.token} onLogout={this.handleLogout} />}
        </>
    }
}