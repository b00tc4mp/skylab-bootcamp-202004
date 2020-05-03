class Twitter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            followersTweets: undefined
        }
    }
  
    componentDidMount(){
        retrieveTweets(this.props.token, (error, followersTweets) => {
            if(error) throw error
            this.setState({followersTweets})
        })
    }
  
    render() {
      return <>
          <section className="tweet">
            <form onSubmit={(event) => {event.preventDefault();this.props.handleTweet(event);}}>
              <input type="text" name="tweet" />
              <button>Tweet</button>
            </form>
          </section>
          {this.props.tweet && <Tweet tweet={this.props.tweet} />}
          {this.state.followersTweets && <Tweets followersTweets={this.state.followersTweets} />}
        </>
    }
  }
  