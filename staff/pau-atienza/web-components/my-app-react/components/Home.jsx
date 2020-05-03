class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            token: this.props.token,
            homeView: 'user',
            user: undefined,
            followersTweets: undefined,
            error: undefined
        }
    }

    componentDidMount(){
        retrieveUser(this.props.token, (error, user) => {
            if (error) return this.setState({ error: error.message })
            this.setState({user})
        })
    }

    changeSearchBar = (input) => this.setState({homeView: input })

    handleSearchUsers = (event)=>{
        let query = event.target.query.value

        searchUser(this.props.token, query, (error, foundUsers) => {
            if(error) return this.setstate({error: error.message})
            this.setState({foundUsers})
        })
    }

    handleFollow = (followID) => {
        toggleFollowUser(this.props.token, followID, this.state.user.followers, (error, email) => {
            if(error) return this.setstate({error: error.message})
            
            retrieveUser(this.props.token, (error, user) => {
                if (error) return this.setState({ error: error.message })
                this.setState({user})
            })
        })
    }

    handleSearchGoogle = (query) => {
        googleSearch(query, (error, googleResults)=>{
            if (error) return this.setState({ error: error.message })
            this.setState({googleResults})
        })
    }
    
    handleTweet = (event) => {
        let text = event.target.tweet.value
        tweet(this.props.token, text, this.state.user.tweets, (error, tweet) => {
            if(error) return this.setstate({error: error.message})

            this.setState({tweet})
            retrieveUser(this.props.token, (error, user) => {
                if (error) return this.setState({ error: error.message })
                this.setState({user})
            })
        })
    }

    render(){
        return <>
            {this.state.user && <NavBar callback = {this.changeSearchBar} name = {this.state.user.name}/>}
            {(this.state.homeView === 'user') &&
            <>
                <UserSearch handleSearchUsers = {this.handleSearchUsers}/> 
                <UserResult foundUsers={this.state.foundUsers} user={this.state.user} handleFollow={this.handleFollow}/>
            </>}

            {this.state.homeView === 'google' && <GoogleSearch handleSearchGoogle = {this.handleSearchGoogle} googleResults={this.state.googleResults}/>}
            {this.state.homeView === 'twitter' && <Twitter token={this.props.token} 
                handleTweet={this.handleTweet} tweet={this.state.tweet} user = {this.state.user}/>}
            {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
        </>
    }
}