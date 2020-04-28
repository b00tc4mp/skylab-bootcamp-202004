const { Component } = React

class App extends Component {

    constructor() {
        super()
        this.state = {
            view: 'landing',
            user: undefined
        }
    }
    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    handleLogout = () => this.setState({
        view: 'landing',
        user: undefined
    })
    handleLogin = (email, password) => {
        loginUser(email, password)
        const currentUser = retrieveUser(email)
        const {name} = currentUser
        this.setState({
            view: 'home',
            user: name
        })
    }
    
    render() {

        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onRegister={this.handleGoToRegister} onSubmitLogin={this.handleLogin} />}
            {this.state.view === 'home' && <Home user={this.state.user} logOut={this.handleLogout}/>}
        </>
    }
}