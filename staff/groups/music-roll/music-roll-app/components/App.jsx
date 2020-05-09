const { Component } = React

class App extends Component {
    constructor(){
        super()

        this.state = {
            view: 'login', 
            token: undefined
        }
    }


    onChangeView = (_view) => this.setState({view : _view})

    handleLogin = (_token) => {
        this.setState({token: _token})
        console.log("done")
        // this.setState({view: 'home'})
    }
    
    handleRegister = () => {
        this.onChangeView('login')
    }

    // handleLogOut = () => {
    //     sessionStorage.token = undefined
    //     this.setState({view: 'login'})
    // }

    render() {
        return <>
            {this.state.view === 'login' && <Login onSubmit = {this.handleLogin} onRegister = {this.onChangeView}/>}
            {this.state.view === 'register' && <Register onSubmit = {this.handleRegister} onLogin = {this.onChangeView} />}
            {/* {this.state.view === 'home' && <Home onLogOut = {this.handleLogOut}/>} */}
        </>

    }
}