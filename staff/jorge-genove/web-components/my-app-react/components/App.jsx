

 const {Component} = React;

 class App extends Component{
     constructor(){
        super()


        this.state = {
        view: 'landing',
        name: undefined,
        useremail: undefined
        
    }
     }    
    
    handleGoToRegister = () => this.setState({view: 'register'})
    /* handleGoToLogin = () => this.setState({view: 'login'})
    handleToGo = () => this.setState({view})  */

    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password)

        this.setState({ view: 'login' })
    }

    handleGoToLogin = () => this.setState({view: 'login'})
    handleLogin= (email, password) => {debugger
        authenticateUser(email, password)
        const user = retrieveUser(email)
        const {name} = user
        retrieveTweets(email) 
        this.setState({view: 'home',
                       user: name, 
                        useremail: email})

    }
    
    

    render(){
        return <>

        {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister}  onLogin = {this.handleGoToLogin}/>}
        {this.state.view === 'register' && <Register onRegister1={this.handleRegister}/>}
        {this.state.view === 'login' && <Login onLogin1={this.handleLogin} />}
        {this.state.view === 'home' && <Home user={this.state.user} useremail ={this.state.email} />}
    
    
</>
    }
}