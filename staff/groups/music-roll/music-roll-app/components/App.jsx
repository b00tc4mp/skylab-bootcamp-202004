const { Component } = React

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'home', 
            token: "BQBiBP-YdwKbzWDxDdM5VYvVngmEUt4pAnwygCz30lEJVVLW6hS4cR99p2IgT-skRb95z2LPgOL0laHi1jdshQZIcGGWFtjb64yaq0wpkcvMirURJcEShmo68_d9Z1D_ioQ85-QLYCA"
        }
    }


    onChangeView = (_view) => this.setState({view : _view})

    handleLogin = (_token) => {
        this.setState({token: _token})
        
         this.setState({view: 'home'})
    }
    
    handleRegister = () => {
        this.onChangeView('login')
    }

   

    render() {
        return <>
            {this.state.view === 'login' && <Login onSubmit = {this.handleLogin} onRegister = {this.onChangeView}/>}
            {this.state.view === 'register' && <Register onSubmit = {this.handleRegister} onLogin = {this.onChangeView} />}

            <Navbar onChangeView={this.onChangeView}/>

            {this.state.view === 'home' && <Home />}
            {this.state.view === 'browser' && <Browser token = {this.state.token}/>}
            
        </>

    }
}