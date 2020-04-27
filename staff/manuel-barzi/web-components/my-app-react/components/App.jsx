const { Component } = React

class App extends Component {
    constructor() {
        super()

        this.state = {
            view: 'landing'
        }
    }

    handleGoToRegister = () => this.setState({ view: 'register' })

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} />}
            {this.state.view === 'register' && <Register />}
        </>
    }
}