const {Component} = React

class App extends Component {
    constructor(){
        super()

        this.state = {
            view: 'landing',
            header: '',
            user: '',
            news1: undefined,
            news2: undefined,
            clickNav: undefined,
            google: undefined,
            navQuery: '',
            navOnserch : undefined,
            errorState : undefined
        }
    }

    // || State functions

    handelRegister = () => this.setState({header: 'register'})
    handelLogin = () => this.setState({header: 'login'})
    handelLanding = () => this.setState({header: ''})

    // || Functions sincron

    searchUser = (error) => {
        this.setState({errorState: error})
        if(!error) this.setState({header:'login'})
    }


    loginUser = (email, password) => {
        let userfinded = findUser(email, password)
        this.setState({user: userfinded})
        this.setState({header: ''})
    }

    // || Functions asincron

    news1 = found => {
         this.setState({news1 : found})
    } 

    news2 = found => {
        this.setState({news2 : found})
   } 

   googleSearch = (found, query) => {
       this.setState({google : found})
       this.setState({navQuery : query})
   }

   loadQuery = () => {
        this.state.navOnserch ? this.setState({navOnserch : ''}) : this.setState({navOnserch : 'fas fa-spinner fa-5x'})
   }

   onNav = () => {
       this.state.clickNav ? this.setState({clickNav : ''}) : this.setState({clickNav : 'click'})
    }
    
            

    render() {
        return <>
            {this.state.view === 'landing' && <Landing onRegister = {this.handelRegister} onLogin = {this.handelLogin} userInfo = {this.state.user} onNavigator = {this.onNav}/>}
            {this.state.clickNav && <GoogleComp onGoogle = {this.googleSearch} results = {this.state.google} query = {this.state.navQuery} loadSpiner = {this.loadQuery} spiner={this.state.navOnserch}/>}
            {this.state.header === 'register' && <Register onLogin = {this.handelLogin} onLanding = {this.handelLanding} onSumbmit = {this.searchUser} onError = {this.state.errorState}/>}
            {this.state.header === 'login' && <Login onRegister = {this.handelRegister} onLanding = {this.handelLanding} onSumbmit = {this.loginUser}/>}
            {this.state.view === 'landing' && <News onNews ={this.news1} results = {this.state.news1}/>}
            {this.state.view === 'landing' && <News2 onload ={this.news2} results = {this.state.news2}/>}
        </>
    }
}