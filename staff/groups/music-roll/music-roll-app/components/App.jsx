const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            spotyToken: "BQBFJ705rq8Mvxem7_t_ExZ8gNkGSZcqZGFcOSWn_yu7fualNDPr1D9wgv4VYcqxlHrkDUqc--CzTAKu_72iXHK7wxsNAFqBrAa9vucDcBGS4E61uNQAVs-EiUs2J93JzKsQTQ",
            token: undefined,
            currentSong: undefined

        }
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

           
            {view === 'favorites' && <Favorites token={this.state.token}/>}


            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home />}
            {view === 'browser' && <Browser spotyToken={spotyToken} token = {token} onSessionExpired={handleSessionExpired} handleMusicTool={handleMusicTool}/>}
            {view === 'browser' && <AudioTool currentSong={currentSong}/>}


        </>
    }
}