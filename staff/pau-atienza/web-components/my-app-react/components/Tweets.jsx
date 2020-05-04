class Tweets extends Component{
  constructor(props) {
    super(props)

    this.state = {
      followingTweets: undefined
    }
  }

  componentDidMount(){
    retrieveTweets(this.props.token, this.props.user,(error, followingTweets) => {
      if(error) throw error
      this.setState({followingTweets})
    })
  }

  printTweets = () => {
    return this.state.followingTweets && this.state.followingTweets.map(({ username, message, date }) => (
      <li>{`${username} tweeted: ${message} ${date.toString().slice(0,10) + ' ' + date.toString().slice(11,16)}`}</li>));
  };

  render(){
    return <>
      {this.props.tweet && <Tweet tweet={this.props.tweet} />}
      <h3>Feed</h3>
      <section className="tweets">
        <ul>{this.printTweets()}</ul>
      </section>
    </>
  }
}
  