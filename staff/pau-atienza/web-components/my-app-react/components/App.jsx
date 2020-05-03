const { Component } = React

class App extends Component{
    constructor() {
        super()

        this.state = {
            view: 'landing',
            error: undefined,
            token: undefined
        }
    }

    changeView = (input) => this.setState({view: input })

    handleLogin = event => {
        let {email, password} = event.target;

        email = email.value
        password = password.value
        try{
            authenticateUser(email, password, (error, token) => {
                if (error) return this.setState({ error: error.message })
                this.setState({token, view: 'home'})
            })
        }catch ({message}){
            this.setState({error: message})
        }
    }

    handleRegister = event => {
        let { name, surname, email, password } = event.target;

        name = name.value; surname = surname.value
        email = email.value; password = password.value
        try{
            registerUser(name, surname, email, password, (error) => {
                if (error) return this.setState({error: error.message})
                this.changeView('login')
            })
        }catch ({message}){
            this.setState({error: message})
        }
    }

    render(){
        return <>
            {this.state.view === 'landing' && <Landing changeView = {this.changeView}/>}
            {this.state.view === 'register' && <Register changeView = {this.changeView} handleRegister = {this.handleRegister}/>}
            {this.state.view === 'login' && <Login changeView = {this.changeView} handleLogin = {this.handleLogin}/>}
            {this.state.view === 'home' && <Home token = {this.state.token}/>}
            {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
        </>
    }
}
