const { Component } = React

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'home', 
            token: "BQC1SVgpkLnHb_O1eB6f49IoXLSHDcQDYqoM7qj8B3vgjA6cdrybJOXCiBr938U-i9csnz8et0ALfMkwo1D_kNq6ktJfIFZ0M7bp9ckE7lp19R9i1nm-1rE0Dk_jIlOcrx0ZFrOlg8ADOXZUNIRow7vMxlqIxPnRytTF2n7S6_Hp0JWyV0lAQl3GfYjA"
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