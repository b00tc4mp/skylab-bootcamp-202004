const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'login', 
            Spotytoken: "BQAdcob0WU47IJZVPj0xAl_mOQTYRVDKPwMzgRBlra7q_DlZNSzBC8Kw-1XLHed79ZyyTXGCKhrMRzDEcwKUbXAXHwpglz4ZmhinU0b7rEgoa8i0EA1Y6KR1xeh2NODRxJL-paGiiRA45GVxJ0c_9I_8TMFKXdAWeJTp9X7ToiUQYTrTK508-hv_6Ajb",
            token: undefined
        }
    }

    onChangeView = (_view) => this.setState({ view: _view })

    handleLogin = (_token) => {
        this.setState({ token: _token })

        this.setState({ view: 'home' })
    }

    handleRegister = () => {
        this.onChangeView('login')
    }

    handleSessionExpired = () => {   
        this.onChangeView('login')
    }

    render() {
        return <>
            {this.state.view === 'login' && <Login onSubmit={this.handleLogin} onRegister={this.onChangeView} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} onLogin={this.onChangeView} />}

            <Navbar onChangeView={this.onChangeView} />

            {this.state.view === 'home' && <Home />}
            {this.state.view === 'browser' && <Browser token = {this.state.Spotytoken}/>}
            {this.state.view === 'friends' && <SearchUsers token = {this.state.token} onUserSessionExpired = {this.handleSessionExpired}/>}
            
        </>

    }
}