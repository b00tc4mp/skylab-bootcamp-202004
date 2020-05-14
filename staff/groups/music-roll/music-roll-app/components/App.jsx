const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {

            view: 'login',
            Spotytoken: "BQA-pOrqYaOQlTmpTsm5EQZoOPif-0AUonAwmwyj3VCTzg3jUOxOxbKsSHtO71GnTOOYC6ajepnejph7YIN9_pJLlaA32NG-x0SAO6m04to5bGYHUSuHPIgP1NV1aZ-GLkLXCw",
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
            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home />}
            {view === 'browser' && <Browser token={Spotytoken} />}
        </>
    }
}