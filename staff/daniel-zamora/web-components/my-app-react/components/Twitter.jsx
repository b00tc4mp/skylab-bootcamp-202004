const { Component } = React
class Twitter extends Component {
    constructor(props) {
        super(props)
    }

    handleOnTweet = (tweet) => {

        writeTweet(tweet, this.props.token, (error) => {
            if (error) return console.log(error) //TODO
            this.props.retrieveTweets()

        })

    }

    render() {
        return <section className="twitter">
            <h2>Twitter</h2>
            <Tweet onSubmitTweet={this.handleOnTweet} />
            {this.props.resultsTweet && <Tweets listTweet={this.props.resultsTweet} />}
        </section>
    }
}