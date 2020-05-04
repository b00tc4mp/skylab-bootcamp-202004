
    const { Component } = React
class Home extends Component {
    constructor() {
        super()

        this.state = {
            view: 'users',  
            googleResults: undefined,
            googleQuery: undefined,
            holaNews: undefined, 
            twitter : undefined,
            twitterFollowing: undefined
        }
    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                this.setState({ name: user.name })
            })
        } catch (error) {
            throw error
        }
    }


    handleGoogle = event => {
        event.preventDefault()

        this.setState({ view: 'google' })
    }

    handleHolaNews = event => {
        event.preventDefault()

        this.setState({ view: 'hola-news' })
    }

    handleTwitter = event => {
        event.preventDefault()
        
        this.setState({ view: 'twitter' })
    }

    handleFollowing = following =>
        this.setState({twitterFollowing:following})

    handleSearchGoogleResultsAndQuery = (results, query) =>
        this.setState({ googleResults: results, googleQuery: query })

    handleRetrieveHolaNewsResults = news =>
        this.setState({ holaNews: news })

    handleRetrieveTwitterResults = tweets =>
        this.setState({ twitter: tweets})

    render() {
        return <section className="home">
            <h1>Welcome Son of a bitch, {this.state.name}!</h1>
            <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : ''}`} href="" onClick={this.handleGoogle}>Google </a>
            <a className={`home__link ${this.state.view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={this.handleHolaNews}>Hola News </a>
            <a className={`home__link ${this.state.view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={this.handleTwitter}>Twitter </a>
            <button onClick={this.props.onLogout}>Logout</button>

            

            {this.state.view === 'google' && <Google onSearch={this.handleSearchGoogleResultsAndQuery} 
            results={this.state.googleResults} query={this.state.googleQuery} />}
            
            {this.state.view === 'hola-news' && <HolaNews onNews={this.handleRetrieveHolaNewsResults}
            news={this.state.holaNews} />}
            
            {this.state.view === 'twitter' && <Twitter onTweets={this.handleRetrieveTwitterResults} onFollowing={this.handleFollowing}
            tweets={this.state.twitter} token={this.props.token} following={this.state.twitterFollowing} />}
            
        </section>
    }
}