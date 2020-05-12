const { Component } = React

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'home', 

            token: "BQDj85_ESBdFATHHkRTgRiKenuuzbHzks13lwymWotcfH-2TMMr8N2pNTrdJsgR917YVxSki8Ui7i1HhA7CpaDNkq6bbxw8CoC83poIvWQQO9Zaxbx1X0mugCVgJ1BAEjQsIqLkzm8o2YlpUDPP_DcQGgwh-UcSwQEhKGMub30nIIrHsgaFp3pE6wgNh"

         

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