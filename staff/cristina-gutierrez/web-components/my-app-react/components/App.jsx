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

    handleRegister = (name, surname, email, password) => {
        
        registerUser(name, surname, email, password, error => {
            if(error) {
                return Feedback(error)
            }
            else {
                this.state.view === "login"
            }
        })

        this.setState({ view: 'login' })
    }

    handleLogin = (email, password) => {
        
        loginUser(email, password, error => {
            if(error) {
                return Feedback(error)
            }
            else {
                this.state.view === "home"
            }
        })

        this.setState({ view: 'home' })
    }

    handleLogout = () => this.setState({ view: 'landing'})

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onGoToRegister={this.handleGoToRegister} onGoToLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onGoToLogin={this.handleGoToLogin}/>}
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onGoToRegister={this.handleGoToRegister}/>}
            {this.state.view === 'home' && <Home name={this.state.user.name} user={this.state.user} onLogout={this.handleLogout} />}
        </>
    }
}