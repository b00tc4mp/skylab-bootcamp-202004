const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            Spotytoken: "BQDXzlsw5RPU67H_LBeyEnQliwEgsmA4SotLrZ2_Is9EJmL3lcn-MRrdkScjolsbwPBv3jNUHaMjtdPODneAPst0gaQwr-wzmZX2meqy7pC4ZrHksuPM4NyPBYrh-eglVwFxz8Fcick",
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
        const { state: { view, Spotytoken, token }, handleLogin, handleRegister, handleSessionExpired, onChangeView } = this;
        return <>

           
            {view === 'favorites' && <Favorites token={this.state.token}/>}


            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home />}
            {view === 'browser' && <Browser token={Spotytoken} />}
            {view === 'friends' && <SearchUsers token={token} onUserSessionExpired={handleSessionExpired} />}

        </>
    }
}