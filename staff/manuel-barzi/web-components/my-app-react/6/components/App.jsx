const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'home'
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    handleRegister = (name, surname, email, password) => {
        registerUser(name, surname, email, password)

        this.setState({ view: 'login' })
    }

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register onSubmit={this.handleRegister} />}
            {/* {this.state.view === 'login' && <Login />} */}
            {this.state.view === 'home' && <Home name="Pepito" />}

            {this.state.view === 'login' && <Smart view={this.state.view} />}
        </>
    }
}