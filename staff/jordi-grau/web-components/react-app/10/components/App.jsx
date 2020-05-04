const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            //view: 'landing',
            view: 'home',
            //token: undefined
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFmMzdjMzkyMzM2YTAwMTU3MDM5NWMiLCJpYXQiOjE1ODg1OTE0MTAsImV4cCI6MTU4ODU5NTAxMH0.cevjOJgEc06iI7yByQFq8Bf6Q0BlxDAHSfrVEql9bUY'
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