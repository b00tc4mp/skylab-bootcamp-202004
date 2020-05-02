class Home extends Component {
    constructor(props) {
        super(props)


        this.state = {
            view: 'users',
            errorUsers: undefined,
            usersResults: undefined,
            errorGoogle: undefined,
            googleResults: undefined,
            errorEcosia: undefined,
            ecosiaResults: undefined,
            tweets: undefined,
        }
    }
    
    handleGoToUsers = (event) => {
        event.preventDefault()

        this.setState({view: 'users'})
    }

    handleSearchUsers = query => {
        searchUsers(this.props.token, query, (error, users) => {
            if (error) this.setState({errorUsers: error.message})
            else this.setState({usersResults: users})
        })
    }

    handleGoToGoogle = (event) => {
        event.preventDefault()

        this.setState({view: 'google'})
    }

    handleGoogle = query => {
        searchGoogle(query, (error, results) =>{
            if (error) this.setState({errorGoogle: error.message})
            else this.setState({googleResults: results})
        })
    }

    handleGoToEcosia = event => {
        event.preventDefault()

        this.setState({view: 'ecosia'})
    }

    handleEcosia = query =>{
        searchEcosia(query, (error, results) =>{
            if(error) this.setState({errorEcosia: error.message})
            else this.setState({ecosiaResults: results})
        })
    }

    handleTweeter = (event) => {
        event.preventDefault()

        this.setState({view: 'tweeter'})
    }

    handleRetriveTweets = (event) => {
        event.preventDefault()
        const myTweets =  retrieveTweets(this.props.userEmail)

        this.setState({tweets: myTweets, view: 'tweeter'})
    }

    handleGoToLogout = event => {
        event.preventDefault();

        this.props.onLogout()
    }


    render() {
        return <section className="home">
            <h1>Welcome {this.props.name}</h1>
            <a className="home__link" href="" onClick = {this.handleGoToUsers}>Users  </a>
            <a className="home__link" href="" onClick = {this.handleGoToGoogle}>Google  </a>
            <a className="home__link" href="" onClick = {this.handleGoToEcosia}>Ecosia  </a>
            <a className="home__link" href="" onClick={this.handleRetriveTweets}>Tweeter  </a>
            <button onClick={this.handleGoToLogout}>Log out</button>

            <News />
            {this.state.view === 'users' && <Search onSubmit={this.handleSearchUsers} results = {this.state.usersResults} error = {this.state.errorUsers}/>}
            {this.state.view === 'google' && <Google onSubmit={this.handleGoogle} results = {this.state.googleResults} error = {this.state.errorGoogle}/>}
            {this.state.view === 'ecosia' && <Ecosia onSubmit={this.handleEcosia} resultsEco = {this.state.ecosiaResults} error = {this.state.errorEcosia}/>}
            {this.state.view === 'tweeter' && <Tweeter tweetList = {this.state.tweets}/>}
        </section>
    }
}