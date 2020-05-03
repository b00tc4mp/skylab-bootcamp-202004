class Twitter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      followersTweets: null,
      tweet: null
    }
  }

  componentDidMount(){
    this.handleRetrieveTweets()
  }

  handleRetrieveTweets = () => {
    retrieveTweets(this.props.token, (error, followersTweets) => {
      if(error) throw error
      this.setState({followersTweets})
    })
  }

  handleTweet = (event) => {
    event.preventDefault();
    let text = event.target.tweet.value
    tweet(this.props.token, text, (error, tweet) => {
        if(error) throw error
        this.setState({tweet})
        this.handleRetrieveTweets()
    })
    }

  render() {
    return (
      <>
        <section className="tweet">
          <form onSubmit={this.handleTweet}>
            <input type="text" name="tweet" />
            <button>Tweet</button>
          </form>
        </section>
        {this.state.tweet && <Tweet tweet={this.state.tweet} />}
        {this.state.followersTweets && <Tweets followersTweets={this.state.followersTweets} />}
      </>
    );
  }
}
