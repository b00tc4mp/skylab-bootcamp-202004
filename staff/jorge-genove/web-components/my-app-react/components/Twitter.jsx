class Twitter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: undefined
        }

     

    }

    componentDidMount() {
        retrieveTweets(this.props.useremail, this.props.token, (error, tweetsArray) => {debugger
            if (error) console.log(error)

            this.setState({ tweets: tweetsArray })

        })
        
    }

    handleTweet = (event) => {
        event.preventDefault()
        let {message} = event.target
        message = message.value
        tweet(this.props.token, message, (error) =>{
        if (error) console.log(error)
        })
    }

    render() {debugger
        return <section className="twitter">
            <h2>Twitter</h2>
            <form onSubmit = {this.handleTweet}>
                <input type="text" name="message"/> <button>Tweet</button>
            </form>

            {this.state.tweets && <ul>
                {this.state.tweets.map(({ name, surname, tweets }) =>
                    <li>
                        <h2>{name} {surname}</h2>
                        {tweets.map(({message, text, date})  => {
                          return  <p>{message || text}  {date}</p>
                        })}
                    </li>
                )}
            </ul>}
        </section>


    }
 
}






