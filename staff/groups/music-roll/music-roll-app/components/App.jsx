const { Component } = React

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'home', 
            token: "BQCDb_-ZIsPThhYa2grmojihZ5hUNma4voaqG92PnR7KssK_SsMwewjos5Hr5zymxLzViwUD9rqaXwDOPtw_USu_ih0GLUBgLDENOpy_XJ8ZEYrKQ2NO-j-PGo2V-vaj2EbGig"
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