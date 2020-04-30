const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            token: undefined,
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    handleGoToHome = token => this.setState({ view: 'home', token })

    logOut = () => this.setState({ view: 'landing', user: undefined})
    
    render() {  
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onLogin={this.handleGoToLogin}/>}
            {this.state.view === 'login' && <Login onHome={this.handleGoToHome} onRegister={this.handleGoToRegister}/>}
            {this.state.view === 'home' && <Home user={this.state.user} onLogout={this.logOut} />}
        </>
    }
}