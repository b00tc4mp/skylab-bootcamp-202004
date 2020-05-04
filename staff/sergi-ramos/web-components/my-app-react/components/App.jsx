const { Component } = React

class App extends Component {

    constructor() {
        super()
        this.state = {
            view: 'landing',
            user: undefined,
            userEmail: undefined,
            token: undefined,
            following: undefined
        }
    }
    handleGoToRegister = () => this.setState({ view: 'register' })
    handleGoToLogin = () => this.setState({ view: 'login' })
    handleLogout = () => this.setState({
        view: 'landing',
        user: undefined
    })
    handleLogin = (email, password) => {
        loginUser(email, password, (error, token) => {
            if (error) console.log(error) // TODO feedback
            else {
                retrieveUser(token, (error, { name, surname, email, following }) => {
                    if (error) console.log(error)
                    else {
                        this.setState({
                            view: 'home',
                            token: token,
                            name: name,
                            surname: surname,
                            userEmail: email,
                            following: following

                        })
                    }
                })
            }
        })
    }
    handleRegister = (name, surname, username, password) => {
        registerUser(name, surname, username, password, (error) => {
            if (error) { console.log(error) }
            else {
                this.setState({ view: 'login' })
            }
        })
    }
    render() {

        return <>
            {this.state.view === 'landing' && <Landing onRegister={this.handleGoToRegister} onLogin={this.handleGoToLogin} />}
            {this.state.view === 'register' && <Register onLogin={this.handleGoToLogin} onSubmitRegister={this.handleRegister} />}
            {this.state.view === 'login' && <Login onRegister={this.handleGoToRegister} onSubmitLogin={this.handleLogin} />}
            {this.state.view === 'home' && <Home token={this.state.token} name={this.state.name} surname={this.state.surname} email={this.state.userEmail} logOut={this.handleLogout} following={this.state.following} />}
        </>
    }
}