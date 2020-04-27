const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            user: ''
        }
    }

    handleGoToLanding = () => this.setState({view: 'landing', user: ''})
    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({view: 'login'})
    handleGoToHome = email => this.setState({view : 'home', user: retrieveUser(email)})


    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin}/>}
            {this.state.view === 'register' && <Register onLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onRegister={this.handleGoToRegister} onSubmit={this.handleGoToHome} />}
            {this.state.view === 'home' && <Home name={this.state.user.name} onLogout={this.handleGoToLanding}/>}
        </>
    }
}