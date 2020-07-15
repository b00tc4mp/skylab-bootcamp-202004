const { Component } = React

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {


            view: 'login',
            spotyToken: "BQDk4WghDXrGV2KRDFA1_hvrocV6jtzXoK_bzWH6EjK2LNA-HoU4X1pTzs1fpUfmg2WGU0bSF_h8fItSxd__UahY07bu8jbjkengs8hppPn9V0jRhtqss7j9NL_NnYF8B-IEmg",
            token: undefined,
            songsList: undefined          

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

    handleMusicTool = (randomSongs) => {
        this.setState({songsList: randomSongs})
    }

   


    render() {
        const { state: { view, spotyToken, token, songsList }, handleLogin, handleRegister, handleSessionExpired, onChangeView , handleMusicTool} = this;
        return <>

           
            {view === 'favorites' && <Favorites token={this.state.token} handleMusicTool={handleMusicTool}/>}


            {view === 'login' && <Login onSubmit={handleLogin} onRegister={onChangeView} />}
            {view === 'register' && <Register onSubmit={handleRegister} onLogin={onChangeView} />}
            {view !== "login" && view !== "register" && <Navbar onChangeView={onChangeView} />}
            {view === 'home' && <Home token = {token} handleMusicTool={handleMusicTool}/>}
            {view === 'browser' && <Browser spotyToken={spotyToken} token = {token} onSessionExpired={handleSessionExpired} handleMusicTool={handleMusicTool}/>}
            {(view === 'browser' || view === 'favorites' || view === 'home') && <AudioTool songsArray={songsList}/>}


        </>
    }
}