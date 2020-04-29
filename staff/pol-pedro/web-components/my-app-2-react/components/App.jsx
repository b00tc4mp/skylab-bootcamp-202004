const {Component} = React

class App extends Component {
    constructor(){
        super()

        this.state = {
            view: 'landing',
            header: '',
            user: '',
            news1: ''
        }
    }

    // || State functions

    handelRegister = () => this.setState({header: 'register'})
    handelLogin = () => this.setState({header: 'login'})
    handelLanding = () => this.setState({header: ''})

    // || Functions sincron

    searchUser = (name, surname, email, password) => {
        userDefine(name, surname, email, password)
        this.setState({header: 'login'})
    }

    loginUser = (email, password) => {
        let userfinded = findUser(email, password)
        this.setState({user: userfinded})
        this.setState({header: ''})
    }

    // || Functions asincron

    // news1 = news20(found => {
    //     this.setState({news1 : found})
    // }) // lets try to recive the found array this way
            

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister = {this.handelRegister} onLogin = {this.handelLogin} userInfo = {this.state.user}/>}
            {this.state.header === 'register' && <Register onLogin = {this.handelLogin} onLanding = {this.handelLanding} onSumbmit = {this.searchUser}/>}
            {this.state.header === 'login' && <Login onRegister = {this.handelRegister} onLanding = {this.handelLanding} onSumbmit = {this.loginUser}/>}
            {this.state.view === 'landing' && <News/>}
        </>
    }
}