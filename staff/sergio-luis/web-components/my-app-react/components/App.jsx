const { Component } = React;

class App extends Component{
    constructor(){
        super()

        this.state={
            view: 'landing'
        }
    }

    handleState = (input) =>{
        
        this.setState({view: input});
    }
    handleRegister =(name,surname,email,password) =>{

        registerUser(name,surname,email,password)
        this.setState({view:'login'})
    }

    render() {
        return <>
            
            {this.state.view === 'landing' && <Landing onClick={this.handleState}/>}
            {this.state.view === 'register' && <Register onClick={this.handleState} onSubmit={this.handleRegister}/>}
            {this.state.view === 'login' && <Login />}
        </>
    }
}