const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            spotyToken: "BQAGbhF9iQkKx1THuGtiv7Iqv-B2miLRLA15E0z9AH_S1KjhyBX6h85j6LHKNNZO90OFsPBwVt5Y4p_uyqYm3nWHjkMyP51VEAaPNuqv5x1SR9YbnBhWI513AyuJXFolRABqsQ",
            token: undefined,
            currentSong: undefined          

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

    handleMusicTool = (preview_url) => {
        this.setState({currentSong: preview_url})
    }

   


    render() {
        const { state: { view, spotyToken, token, currentSong }, handleLogin, handleRegister, handleSessionExpired, onChangeView , handleMusicTool} = this;
        return <>

           
            {view === 'favorites' && <Favorites token={this.state.token} handleMusicTool={handleMusicTool}/>}


            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home />}
            {view === 'browser' && <Browser spotyToken={spotyToken} token = {token} onSessionExpired={handleSessionExpired} handleMusicTool={handleMusicTool}/>}
            {(view === 'browser' || view === 'favorites') && <AudioTool currentSong={currentSong}/>}


        </>
    }
}