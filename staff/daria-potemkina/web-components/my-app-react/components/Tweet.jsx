const { Component } = React

class Tweet extends Component {
    constructor(props) {
        super(props)

        // this.state = { 
        //     error: '', 
        // }
    }

    // handleSubmitTweet = event => {
    //     event.preventDefault()

    //     let { tweets } = event.target

    //     tweets = tweets.value

    //     try {
    //         tweet(this.props.token, tweets, error => {
    //             if (error) return this.setState({ error: error.message })

    //         })
    //     } catch ({ message }) {
    //         this.setState({ error: message })
    //     }
    // }

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
             {/* {this.state.error && <Feedback message={this.state.error} level='error' />} */}
        </section>
    }
}
