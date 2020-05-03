const { Component } = React;

class App extends Component{
    constructor(){
        super()

        this.state={
            view: 'login'
        }
    }

    handleState = (input) =>{
        this.setState({view: input});
    }
    handleRegister =() =>{
        this.setState({view:'login'})
    }
    handleLogin =(token) =>{
        this.setState({ token, view:'home'})
    }
    handleLogout = () =>{
        this.setState({view:'landing'})

    }
  


    render() {
        return <>
            
            {this.state.view === 'landing' && <Landing onClick={this.handleState}/>}
            {this.state.view === 'register' && <Register onClick={this.handleState} onRegister={this.handleRegister}/>}
            {this.state.view === 'login' && <Login onClick={this.handleState} onLogin={this.handleLogin}/>}
            {this.state.view === 'home' && <Home onLogout={this.handleLogout} token={this.state.token}/>}

        </>
    }
}