const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'login',
            spotytoken: "BQBwx0NODenfSTXHWSKT6tmn5cIr-neh4ZUrY1qDz1ogqb_vWNnLHSdDdFzmWAcg3BFYMoVNtd_mkKmIptXLcO-ahUh9ViA7D36qu2SRlnbMAlXc3_RNS7nLX4gRGrWZ0mhKmW7oKoNEty9_HO5jZ6dQKKIc05RgJ-AqpCh-6oE6PjWuZIWXG2zwLfx7",
            token: undefined,
            

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
            {this.state.view === 'browser' && <Browser spotyToken={this.state.spotytoken} token={this.state.token} />}
            {this.state.view === 'friends' && <SearchUsers token={this.state.token} onUserSessionExpired={this.handleSessionExpired} />}
            {this.state.view === 'favorites' && <Favorites token={this.state.token}/>}

        </>

    }
}