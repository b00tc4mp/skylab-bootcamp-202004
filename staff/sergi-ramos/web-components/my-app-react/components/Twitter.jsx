const { Component } = React
class Twitter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tweets : undefined
        }
    }
    
    render() {
        return <section className="twitter">
            <h2>Twitter</h2>
            <Tweet />
            {this.props.resultsTweet && <Tweets listTweet={this.props.resultsTweet}/>}
        </section>
    }
}