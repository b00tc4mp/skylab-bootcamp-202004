const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'login', 
            Spotytoken: "BQB5BrmtRc-K1sqSjmbgP4vlTOKpbPgceRyYYjD8wt9Wmg8OwqST8yxep0a1bkoDp-pPrnRtoQ0zRl1p2cxWOAS9SA85NBeRKvzhEBPlYphCLnlg-vg30cMXs75lE1lW_MDWPg",
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