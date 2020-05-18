const {Component} = React

class App extends Component {
    constructor(){
        super()

        this.state = {
            view: 'landing',
            header: '',
            user: '',
            error: undefined,
            news1: undefined,
            news2: undefined,
            clickNav: undefined,
            clickUser: undefined,
            clickTweeter: undefined,
            google: undefined,
            userLooker: undefined,
            userQuery: undefined,
            navQuery: '',
            navOnserch : undefined,
            twitterSpiner : undefined,
            errorState : undefined,
            token : undefined,
            tweets: undefined,
        }
    }

    // || sincron

    handelRegister = () => this.setState({header: 'register'})
    handelLogin = () => this.setState({header: 'login'})
    handelLanding = () => this.setState({header: ''})

    

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

    userSearch = (found, query) => {
        this.setState({userLooker : found})
        this.setState({userQuery : query})
    }

    loadQuery = () => {
        this.state.navOnserch ? this.setState({navOnserch : ''}) : this.setState({navOnserch : 'fas fa-spinner fa-5x'})
    }

    loadTweeter = () => {
    this.state.twitterSpiner ? this.setState({twitterSpiner : ''}) : this.setState({twitterSpiner : 'fas fa-spinner fa-2x'})
    }

    onNav = () => {
        this.state.clickNav ? this.setState({clickNav : ''}) : this.setState({clickNav : 'click'})
    }

    onSearchUser = () => {
        this.state.clickUser ? this.setState({clickUser : ''}) : this.setState({clickUser : 'click'})
    }

    onBird = () => {
        this.state.view === 'landing' ? this.setState({view : 'tweeter'}) : this.setState({view : 'landing'})
    }

    handelTweets = results => {
        this.setState({tweets: results})
    }

    // || asincron ||

    // || User data functions ||

    searchUser = (error) => {
        this.setState({errorState: error})
        if(!error) this.setState({header:'login'})
    }


    loginUser = (token) => {
        this.setState({token: token})
        this.setState({header: ''})
        retive(token, (error,user) => {
            this.setState({user: user})
            if(error) throw (error)
        })
    }

    // || Follow unfollow functions ||

    handelNewFollow = id => { //actualizar con la base de datos para que si tines dos usarios de la misma cuenta se les actuallize sin tener que refrescar la pafgo
        if(this.state.user.following){ //controalr que si ya lo sigues no guardarla
            if(!this.state.user.following.find(element => element === id)){
                this.state.user.following.push(id)
                updateUser(this.state.token, this.state.user, (error) => {
                    this.setState({error: error})
                })
            }
        }else{
            let follow = []
            follow.push(id)
            this.state.user.following = follow // to do : ir acrualizando
            updateUser(this.state.token, this.state.user, (error) => {
                this.setState({error: error})
            })
        }
    }

    handelUnFollow = id => {
        this.state.user.following = this.state.user.following.filter(element => element !== id)
        updateUser(this.state.token, this.state.user, (error) => {
            this.setState({error: error})
        })
    }

    // || New tweet functions ||

    handelNewTweet = tweet => { // hacer la llamada asincrona dentro de la funcion y despues igualralo
        if(this.state.user.tweets){
            let newTweet = {username: this.state.user.username, text: tweet, date: new Date}
            this.state.user.tweets.push(newTweet)
            updateUser(this.state.token, this.state.user, (error) => {
                this.setState({error: error})
            })
        }else{
            let tweeted = []
            let newTweet = {username: this.state.user.username, text: tweet, date: new Date()}
            tweeted.push(newTweet)
            this.state.user.tweets = tweeted
            updateUser(this.state.token, this.state.user, (error) => {
                this.setState({error: error})
            })
        }
    }
    
            

    render() {
        return <>
            {this.state.view && <Landing onRegister = {this.handelRegister} onLogin = {this.handelLogin} userInfo = {this.state.user} onNavigator = {this.onNav} onUsers = {this.onSearchUser} onTweeter = {this.onBird}/>}
            {this.state.clickNav && <GoogleComp onGoogle = {this.googleSearch} results = {this.state.google} query = {this.state.navQuery} loadSpinner = {this.loadQuery} spiner={this.state.navOnserch}/>}
            {this.state.clickUser && <Home onUsers = {this.userSearch} token = {this.state.token} results = {this.state.userLooker} newFollower = {this.handelNewFollow} unFollow = {this.handelUnFollow} query = {this.state.userQuery} loadSpiner = {this.loadQuery} spiner={this.state.navOnserch} userInfo = {this.state.user}/>}
            {this.state.header === 'register' && <Register onLogin = {this.handelLogin} onLanding = {this.handelLanding} onSumbmit = {this.searchUser} onError = {this.state.errorState}/>}
            {this.state.header === 'login' && <Login onRegister = {this.handelRegister} onLanding = {this.handelLanding} onSumbmit = {this.loginUser}/>}
            {this.state.view === 'landing' && <News onNews ={this.news1} results = {this.state.news1}/>}
            {this.state.view === 'landing' && <News2 onload ={this.news2} results = {this.state.news2}/>}
            {this.state.view === 'tweeter' && <Tweeter token = {this.state.token} loadSpiner = {this.loadTweeter} spiner = {this.state.twitterSpiner} loadTweets = {this.handelTweets} results = {this.state.tweets} newFollower = {this.handelNewFollow} userInfo = {this.state.user} sendNewTweet = {this.handelNewTweet} unFollow = {this.handelUnFollow}/>}
        </>
    }
}