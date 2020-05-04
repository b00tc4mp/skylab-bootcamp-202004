const { Component } = React

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'users',
            usersResults: undefined,
            usersQuery: undefined,
            googleResults: undefined,
            googleQuery: undefined,
            holaNews: undefined,
            tweets: undefined,
            user: {},
            following: this.props.following
        }
    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                this.setState({ user })
            })
        } catch (error) {
            throw error
        }
    }

    displayView = view => {this.setState({ view })}

    handleUsers = event => {
        event.preventDefault()

        this.displayView("users")
    }

    handleGoogle = event => {
        event.preventDefault()

        this.displayView("google")
    }

    handleHolaNews = event => {
        event.preventDefault()

        this.displayView("hola-news")
    }

    handleTwitter = event => {
        event.preventDefault()

        this.displayView("twitter")
    }
    
    handleSearchUsersResultsAndQuery = (results, query) =>
        this.setState({ usersResults: results, usersQuery: query })

    handleSearchGoogleResultsAndQuery = (results, query) =>
        this.setState({ googleResults: results, googleQuery: query })

    handleRetrieveHolaNewsResults = news =>
        this.setState({ holaNews: news })

    handleRetrieveTwitterResults = tweets =>
        this.setState({ tweets })

    render() {
        return <section className="home">
            <h1>Welcome, {this.state.user.name}!</h1>
            <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : ''}`} href="" onClick={this.handleUsers}>Users </a>
            <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : ''}`} href="" onClick={this.handleGoogle}>Google </a>
            <a className={`home__link ${this.state.view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={this.handleHolaNews}>Hola News </a>
            <a className={`home__link ${this.state.view === 'twitter' ? 'home__link--active' : ''}`} href="" onClick={this.handleTwitter}>Twitter </a>
            <button onClick={() => {
                this.setState({
                    following: [],
                    usersResults: undefined,
                    usersQuery: undefined,
                    googleResults: undefined,
                    googleQuery: undefined,
                    holaNews: undefined,
                    tweets: undefined,
                    user: undefined
                })
                
                this.props.onLogout()
            }}>Logout</button>

            {this.state.view === 'users' && <Users onSearch={this.handleSearchUsersResultsAndQuery} results={this.state.usersResults} query={this.state.usersQuery} token={this.props.token} />}
            {this.state.view === 'google' && <Google onSearch={this.handleSearchGoogleResultsAndQuery} results={this.state.googleResults} query={this.state.googleQuery} />}
            {this.state.view === 'hola-news' && <HolaNews onNews={this.handleRetrieveHolaNewsResults} news={this.state.holaNews} />}
            {this.state.view === 'twitter' && <Twitter onTweets={this.handleRetrieveTwitterResults} tweets={this.state.tweets} token={this.props.token} />}
        </section>
    }
}