const { Component } = React

class Home extends Component {
    constructor(props) {
        super(props)


        this.state = {
            error: undefined,
            name: undefined,
            following: undefined,
            view: 'users',
            errorUsers: undefined,
            usersResults: undefined,
            userQuery: undefined,
            errorGoogle: undefined,
            googleResults: undefined,
            errorEcosia: undefined,
            ecosiaResults: undefined,
            errorTweets: undefined,
            following: undefined,
            toggleFollowError: undefined,
            news: undefined

        }
    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                this.setState({ name: user.name, following: user.following })

            })
        } catch (error) {
            throw error
        }
    }

    goToView = view => {
        location.hash = view

        this.setState({ view })
    }

    handleGoToUsers = (event) => {
        event.preventDefault()

        this.goToView('users')
    }

    handleSearchUsers = query => {
        try {
            searchUsers(this.props.token, query, (error, users) => {
                if (error) this.setState({ errorUsers: error.message })
                else this.setState({ usersResults: users, userQuery: query })
            })
        } catch (error) {
            throw error
        }
    }

    handleGoToGoogle = (event) => {
        event.preventDefault()

        this.goToView('google')
    }

    handleGoogle = query => {
        try {
            searchGoogle(query, (error, results) => {
                if (error) this.setState({ errorGoogle: error.message })
                else this.setState({ googleResults: results })
            })
        } catch (error) {
            throw error
        }
    }

    handleGoToEcosia = event => {
        event.preventDefault()

        this.goToView('ecosia')
    }

    handleEcosia = query => {
        try {
            searchEcosia(query, (error, results) => {
                if (error) this.setState({ errorEcosia: error.message })
                else this.setState({ ecosiaResults: results })
            })
        } catch (error) {
            throw error
        }
    }

    handleGoToTwitter = (event) => {
        event.preventDefault()

        this.goToView('twitter')
    }

    handleGoToLogout = event => {
        event.preventDefault();

        this.props.onLogout()
    }

    handleFollowing = id => {
        try {
            toggleFollowUser(this.props.token, id, error => {
                if (error) this.setState({ toggleFollowError: error.message })
                try {
                    retrieveUser(this.props.token, (error, user) => {
                        if (error) return this.setState({ error: error.message })
                        else {
                            this.setState({ following: user.following })
                            this.handleSearchUsers(this.state.userQuery)
                        }
                    })
                } catch (error) {
                    throw error
                }
            })
        } catch (error) {
            throw error
        }
    }

    handleDailyNews = news => {
        this.setState({ news })
    }



    render() {
        return <section className="home">
            <h1>Welcome {this.state.name}</h1>
            <a className="home__link" href="" onClick={this.handleGoToUsers}>Users  </a>
            <a className="home__link" href="" onClick={this.handleGoToGoogle}>Google  </a>
            <a className="home__link" href="" onClick={this.handleGoToEcosia}>Ecosia  </a>
            <a className="home__link" href="" onClick={this.handleGoToTwitter}>Twitter  </a>
            <button onClick={this.handleGoToLogout}>Log out</button>

            <News onNews={this.handleDailyNews} news={this.state.news} />
            {this.state.view === 'users' && <Search onSubmit={this.handleSearchUsers} results={this.state.usersResults} error={this.state.errorUsers} following={this.state.following} toggleFollowUser={this.handleFollowing} />}
            {this.state.view === 'google' && <Google onSubmit={this.handleGoogle} results={this.state.googleResults} error={this.state.errorGoogle} />}
            {this.state.view === 'ecosia' && <Ecosia onSubmit={this.handleEcosia} resultsEco={this.state.ecosiaResults} error={this.state.errorEcosia} />}
            {this.state.view === 'twitter' && <Twitter token={this.props.token} />}
        </section>
    }
}