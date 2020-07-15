const { Component } = React
class Feed extends Component {
    constructor(props) {
        super(props)

    }


    createTweet = event => {
        event.preventDefault()
        const myTweet = event.target.mytweet.value
        const user = this.props.loggedUser
        user.twitter.tweets.push({ tweet: myTweet })
    }


    render() {
        return <section>
            <form onSubmit={this.createTweet}>
                <input name="mytweet" type="text" placeholder="Write your tweet here! (140 characters)" maxLength="140" />
                <button type="submit" >💌</button>
            </form>
            <TweetResults data={tweetRetriever(this.props.loggedUser)} />

        </section>
    }
}