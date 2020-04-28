const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }

    handleGoTo = view => this.setState({view})

    newRegister = (name, surname, email, password) =>{

        registerUser(name, surname, email, password)

        this.setState({ view: 'login' })
    }

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoTo} />}
            {this.state.view === 'register' && <Register onSend={this.newRegister}/>}
            {this.state.view === 'login' && <Login />}
        </>
    }
}