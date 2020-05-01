class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            homeView: 'user',
            user: this.props.user,
            latestTweet: undefined
        }
    }

    changeSearchBar = (input) => this.setState({homeView: input })
      
    handleTweet = (event) =>{
        event.preventDefault()
        let email = this.state.user
        let text = event.target.tweet.value
        tweet(email, text)
        this.setState({latestTweet: text})

    }
    
    render(){
        return <>
            <NavBar callback = {this.changeSearchBar} name = {this.props.name}/>
            {this.state.homeView === 'user' && <UserSearch/>}
            {this.state.homeView === 'twitter' && <Twitter handleTweet = {this.handleTweet} email ={this.state.user}/>}

            {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
        </>
    }
}