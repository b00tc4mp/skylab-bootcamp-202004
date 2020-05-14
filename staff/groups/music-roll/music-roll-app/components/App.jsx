const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            spotyToken: "BQCUV46pr70mmLqu3rdkUR0CM27sYe_DNgIHEAIKltfkZcY2JIksQm1SU_UX7a8QSLsZ1tCKnM8ZSimVS6Itv_pGrVpRycbuijhe6JBgAc4OK7fxPQuqpd_l4bAdklgF1Z0g1g",
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