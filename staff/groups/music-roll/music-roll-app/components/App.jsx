const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',

            spotyToken: "BQBhmMElRh3Ozu6EIuLUjQ1DvW7Q2mm71LtI_EE46VynkFSEs8xgiAa5_tn3XiLPR3UqJaT-BYTVRD8fckxWL_eZg3q87H_8H7qAj21S1Gx8yTuQgk4B4U8ZGV5zHL4zyCGWqv2lhqnLguNyPY9zy5zTf0yP6noKFk3ZpRxhFLYX8v1Ij0kvwuGDRMBh",

            

            token: undefined

            

        }
    }
    componentDidMount(){
        if(sessionStorage.token) this.setState({view: 'home'})  
         this.setState({token : sessionStorage.token})  
    }
    onChangeView = (_view) => this.setState({ view: _view })

    handleLogin = (_token) => {
        sessionStorage.token = _token
        this.setState({ token: _token })
        this.setState({ view: 'home' })
    }

    handleRegister = () => {
        this.onChangeView('login')
    }

    handleSessionExpired = () => {
        sessionStorage.token = undefined
        this.setState({token: undefined})
        this.onChangeView('login')
    }

    
   


    render() {
        const { state: { view, spotyToken, token }, handleLogin, handleRegister, handleSessionExpired, onChangeView } = this;
        return <>

           
            {view === 'favorites' && <Favorites token={this.state.token}/>}


            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home />}
            {view === 'browser' && <Browser spotyToken={spotyToken} token = {token} onSessionExpired={this.handleSessionExpired}/>}

        </>
    }
}