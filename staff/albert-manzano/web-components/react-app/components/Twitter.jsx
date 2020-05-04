class Twitter extends Component {
    constructor(props) {
        super(props)
        
        this.state ={
            view:   'tweets',
            error : undefined,
            success : undefined,
            usersResults: undefined,
            usersQuery: undefined
        }
    }

    componentDidMount() {
        !this.props.tweets && retrieveTweets(this.props.token, (error, tweets) => {
            if (error) throw error // TODO handle this error!
          
            this.props.onTweets(tweets)
        })
        retrieveFollowing(this.props.token,(error,following)=>{
            this.props.onFollowing(following)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const message = event.target.tweet.value

        try{
            tweet(this.props.token, message, (error,success)=>this.setState({success :success}))
            
        }catch (error){
            this.setState({error : message})
        }
    }

    handleSearchUsersResultsAndQuery = (results, query) =>
    this.setState({ usersResults: results, usersQuery: query })


    handleTwitter = event => {
        event.preventDefault()

        this.setState({ view: 'twitter' })
    }

    handleTweets = event => {
        event.preventDefault()

        this.setState({ view: 'tweets' })
    }

    handleTweet = event => {
        event.preventDefault()

        this.setState({ view: 'tweet' })
    }

    toggle=(token,id)=>{
        toggleFollowUser(token,id,(error,boolean))
        {this.state.success && <Feedback message={this.state.success} level="undefined" />}
        {this.state.error && <Feedback message={this.state.error} level="error" />}
        let toggle
        if((this.props.twitterFollowing).includes(id)){
            toggle= "unfollow"
        }else{
            toggle= "follow"
        }
        return toggle
    }

    render() {
        return <section className="Twitter">
            <h2>Twitter</h2>  
            <a className={`Twitter__link ${this.state.view === 'twitter' ? 'Twitter__link--active' : ''}`} href="" onClick={this.handleTwitter}>twitter </a>
            <a className={`Twitter__link ${this.state.view === 'tweets' ? 'Twitter__link--active' : ''}`} href="" onClick={this.handleTweets}>tweets </a>
            <a className={`Twitter__link ${this.state.view === 'tweet' ? 'Twitter__link--active' : ''}`} href="" onClick={this.handleTweet}>tweet </a>

            {this.state.view === 'twitter' && <Users onSearch={this.handleSearchUsersResultsAndQuery} 
            token={this.props.token} users={this.state.usersResults} query={this.state.usersQuery} />}
                
            {this.state.view === 'tweets' && <Tweets tweets={this.props.tweets} handleToggle={this.handleTweet}
            following={this.props.twitterFollowing} token={this.props.token} toggle={this.props.toggle}/>}

            {this.state.view === 'tweet' && <Tweet tweets={this.props.tweets} token={this.props.token} handleOnSubmit={this.onSubmit} />}
            
        </section>
             
}}

