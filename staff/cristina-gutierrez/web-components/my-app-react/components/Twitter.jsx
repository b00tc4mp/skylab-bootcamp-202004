class Twitter extends Component {
    componentDidMount() {
        !this.props.tweets && retrieveTweets(this.props.token, (error, tweets) => {
            if (error) throw error

            this.props.onTweets(tweets)
        })
    }

    render() {
        return <section className="Twitter">
            <h2>Twitter</h2>

            {this.props.tweets && <ul>
                {this.props.tweets.map(({ message, username }) =>
                    <li>
                        <h2>{username}</h2>
                        <p>{message}</p>
                    </li>
                )}
            </ul>}
        </section>
    }
}