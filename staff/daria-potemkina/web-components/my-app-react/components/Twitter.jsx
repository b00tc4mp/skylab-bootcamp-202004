class Tweeter extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            tweet: undefined
        }
    }
    // function handleSearchTweets (email){
    //     return retrieveTweets(email)
    // }

    render() {
        return <section className="tweeter">
            <h2>Tweeter</h2>
            <Tweet />
            {this.props.tweetList && <Tweets allTweets={this.props.tweetList} />}
        </section>
    }
}