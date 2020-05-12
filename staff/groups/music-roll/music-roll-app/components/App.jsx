const { Component } = React

class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            view: 'home', 
            token: "BQDYUElXulZHy6GV_jd7qoaRofJx8Na2jbZeHq76CXyIXxtv7zh2wp_KzSi6mH1Qqkm6gY09h3Iz9Akx-rLrOtCbGyFD6kYTTKCQBQC1m35ubawIdBpcCI8Vi_-nBreQfUi4cQ"
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