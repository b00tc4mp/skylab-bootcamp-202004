const { Component } = React;

class Twitter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: undefined
    }
  }
  componentDidMount () {
    try {
      retrieveTweets(this.props.getToken, (error, list) => {
        if (error) {
          throw error          
        } 
        this.setState({ tweets, list })
      })
    } catch (error) {
      throw error
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    let { tweet } = event.target
    tweet = tweet.value

    createTweet(getToken, tweet, error => {
      if (error) throw error
    })
  }

  render () {
    return <section className='Twitter'>
        <h1>Twitter</h1>
        <form onSubmit={this.handleSubmit}>
          <input name='tweet' placeholder='twitea un poco' />
          <button>Submit</button>
        </form>

        {this.state.tweets.length ?
          <>
            <ul>
              {this.state.tweets.forEach(element => {
                element.map(({ username, message, newDate }) => (
                  <li>{`${username} ${message} ${newDate}`}</li>
                ))
              })}
            </ul>
          </>
         : <Feedback message='sorry, no results :(' level='warning' />
        }
      </section>
  }
}