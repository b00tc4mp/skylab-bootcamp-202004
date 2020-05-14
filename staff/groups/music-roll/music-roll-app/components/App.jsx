const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            spotyToken: "BQBl4Dyes0NWfOV2Af6-WweZDaqF8b1Z0e-Ns9in92Hclwl-AKAgMxClK66rS8W88MFOeVKxExSiNMVn86bogM2BIoYgolfBGShkYnYyrFoct2sRqXiVtsB3DOZm7ldP4ge7UA",
            token: undefined

        }
    }

    onChangeView = (_view) => this.setState({ view: _view })

    handleLogin = (_token) => {
        sessionStorage.token = _token
        this.setState({ token: _token })
        this.setState({ view: 'home' })
    }

    handleRegister = () => {
        this.onChangeView('login')
    }

    handleSessionExpired = () => {
        sessionStorage.token = undefined
        this.setState({token: undefined})
        this.onChangeView('login')
    }


   


    render() {
        const { state: { view, spotyToken, token }, handleLogin, handleRegister, handleSessionExpired, onChangeView } = this;
        return <>

           
            {view === 'favorites' && <Favorites token={this.state.token}/>}


            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home />}
            {view === 'browser' && <Browser spotyToken={spotyToken} token = {token} onSessionExpired={this.handleSessionExpired}/>}

        </>
    }
}