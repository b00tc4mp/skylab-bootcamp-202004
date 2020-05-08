const { Component } = React

class App extends Component {
    constructor(){
        super()

        this.state = {
            view: 'login', 
            token: undefined
        }
    }

    // onChangeView = (_view) => this.setState({view : _view})

    // handleLogin = (_token) => {
    //     this.state.token = _token
    // }
    
    // handleRegister = () => {
        
    // }

    // handleLogOut = () => {
    //     sessionStorage.token = undefined
    //     this.setState({view: 'login'})
    // }

    render() {
        return <>
            {this.state.view === 'login' && <Login />}
            {/* {this.state.view === 'register' && <Register onLogin = {this.onChangeView} onSubmit = {this.handleRegister}/>} */}
            {/* {this.state.view === 'home' && <Home onLogOut = {this.handleLogOut}/>} */}
        </>

    }
}