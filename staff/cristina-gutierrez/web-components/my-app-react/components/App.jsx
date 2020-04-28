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

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin}/>}
            {this.state.view === 'register' && <Register onLogin={this.handleGoToLogin}/>}
            {this.state.view === 'login' && <Login onRegister={this.handleGoToRegister}/>}
        </>
    }
}