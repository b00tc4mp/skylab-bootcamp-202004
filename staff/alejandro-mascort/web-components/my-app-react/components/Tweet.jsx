class Tweet extends Component {
    constructor (props) {
        super(props)
        this.state = {
            view: 'feed',
            userTweets: undefined
        }
    }
    
    handleViewFeed = event => {
        event.preventDefault()

        this.setState({view:'feed'})
    }

    handleViewMyTweets = event => {
        event.preventDefault()

        this.setState({view:'my tweets'})
    }

    handleViewUserProfile = event => {
        event.preventDefault()

        this.setState({view:'user profile'})
    }

    handleCreateTweet = query => {
        tweet(this.props.email, query)
        this.setState({view: 'feed'})
    }

    render() {
        return <section className="tweet">
             <a href='' className={`home__link ${this.state.view === 'feed' ? 'home__link--active' : '' }`} onClick={this.handleViewFeed}><h1> Feed </h1></a>
             <a href='' className={`home__link ${this.state.view === 'my tweets' ? 'home__link--active' : '' }`} onClick={this.handleViewMyTweets}><h1> My Tweets </h1></a>
             <a href='' className={`home__link ${this.state.view === 'my tweets' ? 'home__link--active' : '' }`} onClick={this.handleViewUserProfile}><h1> Search User Profile </h1></a>
            { this.state.view == 'feed' && <CreateTweet onSubmit={this.handleCreateTweet} />}
            { this.state.view == 'feed' && <Tweets email={this.props.email} view='feed'/> }
            { this.state.view == 'my tweets' && <Tweets email={this.props.email} view='my tweets' /> }
            { this.state.view == 'user profile' && <User email={this.props.email} view='my tweets' /> }
        </section>

    }
}    