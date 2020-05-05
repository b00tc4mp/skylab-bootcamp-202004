// class Tweet extends Component {
//     constructor (props) {
//         super(props)

//         this.state = {
//             view: 'feed',
//             allTweets: undefined,
//             error: undefined
//         }
//     }
    
//     handleViewFeed = event => {
//         event.preventDefault()

//         this.setState({view:'feed'})
//     }

//     handleViewMyTweets = event => {
//         event.preventDefault()

//         this.setState({view:'my tweets'})
//     }

//     handleViewUserProfile = event => {
//         event.preventDefault()

//         this.setState({view:'user profile'})
//     }

//     handleCreateTweet = message => {
//         tweet(this.props.token, message, error => {
//             if (error) this.setState({error})
//             else {
//                 retrieveTweets(this.props.token, (error, tweets) => {
//                     if (error) this.setState({error})
//                     else this.setState({allTweets: tweets})
//                 })
//             }
//         })
//     }

//     componentDidMount = () => {
//         retrieveTweets(this.props.token, (error, tweets) => {
//             if (error) this.setState({error})
//             else this.setState({allTweets: tweets})
//         })
//     }

//     render() {
//         return <section className="tweet">
//              <a href='' className={`home__link ${this.state.view === 'feed' ? 'home__link--active' : '' }`} onClick={this.handleViewFeed}><h1> Feed </h1></a>
//              <a href='' className={`home__link ${this.state.view === 'my tweets' ? 'home__link--active' : '' }`} onClick={this.handleViewMyTweets}><h1> My Tweets </h1></a>
//             { this.state.error && <Feedback message={this.state.error} level='error' />}
//             { this.state.view == 'feed' && <CreateTweet onSubmit={this.handleCreateTweet} />}
//             { this.state.allTweets && <Tweets tweets={this.state.allTweets} view={this.state.view}/> }
//         </section>

//     }
// }

function Tweet({token, onLogin}) {
    const [view, setView] = useState('feed')
    const [allTweets, setAllTweets] = useState(undefined)
    const [error, setError] = useState(undefined)

    function handleViewFeed(event) {
        event.preventDefault()

        setView('feed')
    }

    function handleViewMyTweets(event) {
        event.preventDefault()

        setView('my tweets')
    }

    function handleCreateTweet(message) {
        tweet(token, message, error => {
            if (error) {
                if (error.message === 'invalid token') {
                    sessionStorage.token = ''
                    onLogin()
                    return
                }
                setError(error.message)
                
            } else {
                retrieveTweets(token, (error, tweets) => {
                    if (error) {
                        if (error.message === 'invalid token') {
                            sessionStorage.token = ''
                            onLogin()
                            return
                        }
                    } else setAllTweets(tweets)
                })
            }
        })
    }

    useEffect(() => {
        retrieveTweets(token, (error, tweets) => {
            if (error) {
                if (error.message === 'invalid token') {
                    sessionStorage.token = ''
                    onLogin()
                    return
                }
                setError(error.message)
                
            } else setAllTweets(tweets)
        })
    }, [])

    return <section className="tweet">
             <a href='' className={`home__link ${view === 'feed' ? 'home__link--active' : '' }`} onClick={handleViewFeed}><h1> Feed </h1></a>
             <a href='' className={`home__link ${view === 'my tweets' ? 'home__link--active' : '' }`} onClick={handleViewMyTweets}><h1> My Tweets </h1></a>
            { error && <Feedback message={error} level='error' />}
            { view == 'feed' && <CreateTweet onSubmit={handleCreateTweet} />}
            { allTweets && <Tweets tweets={allTweets} view={view}/> }
    </section>
}