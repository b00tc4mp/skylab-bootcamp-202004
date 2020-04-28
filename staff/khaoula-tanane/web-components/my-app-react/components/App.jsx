const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing',
            user: null
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    
    handleLoginSubmit = (event) => {
        let { email, password } = event.target
        email = email.value
        password = password.value
        try{
            const user = authenticateUser(email, password)
            this.setState({user, view: 'home'})
        } catch (error){
            console.log(error)
        }
    }

    handleRegisterSubmit = (event) => {
        let { name, surname, email, password } = event.target

        name = name.value
        surname = surname.value
        email = email.value
        password = password.value

        try {
            registerUser(name, surname, email, password)
            this.handleGoToLogin()
        } catch (error) {
       console.log(error)}
    }


    render() {
        return <>
            {this.state.view === 'landing' && <Landing onLogin={this.handleGoToLogin} onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register onRegisterSubmit={this.handleRegisterSubmit} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'login' && <Login onLoginSubmit={this.handleLoginSubmit} onRegister={this.handleGoToRegister} />}
            {this.state.view === 'home' && <Home user={this.state.user}/>}

        </>
    }

}