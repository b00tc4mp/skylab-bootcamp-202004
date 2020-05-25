const { Component } = React

class Tweet extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return <section className="tweet">
            <form onSubmit={event =>{
                event.preventDefault()

                let {tweets} = event.target

                tweets = tweets.value

                this.props.onSubmitTweet(tweets)
            }}>
                <textarea name="tweets"></textarea>
                <button>Tweet</button>
            </form>
             {}
        </section>
    }
}
