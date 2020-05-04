/*function Tweet ({onSubmit}){
    return <section className="tweet">
        <form onSubmit = {event => {
            event.preventDefault()

            onSubmit()
        }}>

            <input type="text" name="tweet"></input>
            <button>Tweet</button>
        </form>
    </section>
}*/

class Tweet extends Component {
    constructor (props) {
        super(props)

        this.state = {
            view: 'feed',
            allTweets: undefined,
            error: undefined
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

    handleCreateTweet = message => {
        tweet(this.props.token, message, error => {
            if (error) this.setState({error})
            else {
                retrieveTweets(this.props.token, (error, tweets) => {
                    if (error) this.setState({error})
                    else this.setState({allTweets: tweets})
                })
            }
        })
    }

    componentDidMount = () => {
        retrieveTweets(this.props.token, (error, tweets) => {
            if (error) this.setState({error})
            else this.setState({allTweets: tweets})
        })
    }

    render() {
        return <section className="tweet">
            <a href='' className={`home__link ${this.state.view === 'feed' ? 'home__link--active' : '' }`} onClick={this.handleViewFeed}><h1> Feed </h1></a>
            <a href='' className={`home__link ${this.state.view === 'my tweets' ? 'home__link--active' : '' }`} onClick={this.handleViewMyTweets}><h1> My Tweets </h1></a>
            { this.state.error && <Feedback message={this.state.error} level="error" />}
            { this.state.view == 'feed' && <CreateTweet onSubmit={this.handleCreateTweet} />}
            { this.state.allTweets && <Tweets tweets={this.state.allTweets} view={this.state.view}/> }
        </section>

    }
} 