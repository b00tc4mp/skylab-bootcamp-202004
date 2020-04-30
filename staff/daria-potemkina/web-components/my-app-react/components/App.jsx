const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: "home",
            user: undefined,
            userEmail: undefined
        }        
    }

    handleGoToLogin = () => this.setState({ view: 'login' })

    handleLogin = (email, password) => {
        authenticateUser (email, password)
        const myUser = retrieve(email)
        const {name, _email } = myUser

        this.setState({ view: 'home', user: name, userEmail: _email })
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleRegister = (name, surname, mail, password) =>{
        registerUser(name, surname, mail, password)

        this.setState({ view: 'login' })
    }

    handleGoToHome = () => this.setState({ view: 'home' })

    handleGoToLanding = () => this.setState({ view: 'landing' })
   
    render (){
        return <>
            {this.state.view === 'landing' && <Landing onLogin = {this.handleGoToLogin} onRegister = {this.handleGoToRegister} />}
            {this.state.view === 'login' && <Login onSubmit = {this.handleLogin} onRegister = {this.handleGoToRegister}/>}
            {this.state.view === 'register' && <Register onSubmit = {this.handleRegister} onLogin = {this.handleGoToLogin}/>}
            {this.state.view === 'home' && <Home name = {this.state.user} userEmail ={this.state.userEmail} onLogout = {this.handleGoToLanding} />}
        </>
    }
}