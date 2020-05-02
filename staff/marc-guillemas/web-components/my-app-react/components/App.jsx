const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: undefined,
   
            view: 'login'
        }
    }

    changeView = (_view) => this.setState({view: _view})
    // handleGoToLogin = () => this.setState({view: 'login'})

    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password, (error) =>{
            if(error) throw error

            this.setState({ 
                view: 'login' 
            })
    
        })

    }

    handleLogin = (email, password) => {
       authenticateUser(email, password, (error,token) => {
           if(error) throw error
            
            this.setState({ token, view: 'home' })

       })
        
    }

    handleLogout = () =>{
        this.setState({token: undefined ,view:'login'})
        
    }

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.changeView} onLogin={this.changeView}/>}
            {this.state.view === 'register' && <Register onLogin={this.changeView} onSubmit = {this.handleRegister}/>}
            {this.state.view === 'login' && <Login onRegister={this.changeView} onSubmit={this.handleLogin}/>}
            {this.state.view === 'home' && <Home token={this.state.token} onLogout={this.handleLogout}/>}
        </>
    }
}



