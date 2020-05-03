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
      
    handleTweet = (event) => {
        let text = event.target.tweet.value
        tweet(this.props.token, text, (error, tweet) => {
            if(error) return this.setstate({error: error.message})
            this.setState({tweet})
        })
    }

    handleSearchUsers = (event)=>{
        let query = event.target.query.value
        searchUser(this.props.token, query, (error, foundUsers) => {
            if(error) return this.setstate({error: error.message})
            this.setState({foundUsers})
        })
    }

    handleFollow = (followID) => {
        toggleFollowUser(this.props.token, followID, (error, email) => {
            if(error) return this.setstate({error: error.message})
            
            retrieveUser(this.props.token, (error, user) => {
                if (error) return this.setState({ error: error.message })
                this.setState({user})
            })
        })
    }
    
    render(){
        return <>
            <NavBar callback = {this.changeSearchBar} name = {this.props.name}/>
            {(this.state.homeView === 'user') &&
            <>
            <UserSearch handleSearchUsers = {this.handleSearchUsers}/> 
            <UserResult foundUsers={this.state.foundUsers} user={this.state.user} handleFollow={this.handleFollow}/>
            </>}
            {this.state.homeView === 'twitter' && <Twitter token={this.props.token} handleTweet={this.handleTweet} tweet={this.state.tweet}/> }
            {this.state.error && <Feedback message = {this.state.error} level = 'error'/>}
        </>
    }
}