const { Component } = React

class App extends Component{
    constructor() {
        super()

        this.state = {
            view: 'home',
            user: 'pauatro@gmail.com',
            error: '',
            name: 'Pau'
        }
    }

    changeView = (input) => this.setState({view: input })

    handleLogin = event => {
        event.preventDefault();
        let {email, password} = event.target;
        email = email.value
        password = password.value

        try{
            authenticateUser(email, password)
            let {name} = retrieveUser(email)
            this.setState({user: email, name, view: 'home'})
        }catch ({message}){
            this.setState({error: message})
        }
    }

    

    render(){
        return <>
            {this.state.view === 'landing' && <Landing callback = {this.changeView}/>}
            {this.state.view === 'register' && <Register callback = {this.changeView} uponRegister = {this.submitRegister}/>}
            {this.state.view === 'login' && <Login callback = {this.changeView} handleLogin = {this.handleLogin}/>}
            {this.state.view === 'home' && <Home user = {this.state.user} name = {this.state.name}/>}
            {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
        </>
    }
}

// function App(){return <><Landing/></>}
