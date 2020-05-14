const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            spotyToken: "BQDkDxsHxiEvXdh1MVFx2I3hyPZrdgBoi9xASNb2c_HWMqe-V5TQKlKN4brhkJyElTT-4ZR0lLBky2pbotM4MNFvywcrVTA45_q0NYEy5v6ENIQsyDE5RCdspFQYmpMu7OBanFYn9TA5KNb6KAuD3A1lNVOYEH_DElfSmxT6N1FWduWfIYlKMJ2pIgwd",
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