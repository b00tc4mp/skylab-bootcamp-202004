const {Component} = React

class App extends Component {
    constructor(){
        super()

        this.state = {
            view: 'landing',
            header: ''
        }
    }

    // || State functions

    handelRegister = () => this.setState({header: 'register'})
    handelLogin = () => this.setState({header: 'login'})
    handelLanding = () => this.setState({header: ''})

    // || Functions

    searchUser = (name, surname, email, password) => {
        debugger
        userDefine(name, surname, email, password)
        this.setState({header: 'login'})
    }

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister = {this.handelRegister} onLogin = {this.handelLogin}/>}
            {this.state.header === 'register' && <Register onLogin = {this.handelLogin} onLanding = {this.handelLanding} onSumbmit = {this.searchUser}/>}
            {this.state.header === 'login' && <Login onRegister = {this.handelRegister} onLanding = {this.handelLanding}/>}
        </>
    }
}