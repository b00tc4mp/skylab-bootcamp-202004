class Twitter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tweets: undefined,
            tweetsError: undefined
        }
    }

    componentDidMount(){
            retrieveTweets(this.props.token, (allTweets) =>{
                this.setState({tweets: allTweets})
            })
    }

    render() {
        return <section className="twitter">
            <h2>Twitter</h2>
            <Tweet token={this.props.token}/>
            {this.state.tweets && <Tweets allTweets={this.state.tweets}/>}
        </section>
    }
}