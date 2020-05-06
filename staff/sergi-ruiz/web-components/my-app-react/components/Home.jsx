const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = {
            view: 'spinner',
            usersResults: undefined,
            usersQuery: undefined,
            googleResults: undefined,
            googleQuery: undefined,
            holaNews: undefined
        }
    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash = hash? hash : 'users'

                this.setState({ name: user.name, view: hash? hash : 'users' })
            })
        } catch (error) {
            throw error
        }
    }

    goToView = view => {
        location.hash = view === 'users' || view === 'google' || view === 'hola-news' ? view : ''


        this.setState({ view })
    }

    handleUsers = event => {
        event.preventDefault()

        this.goToView('users')
    }

    handleGoogle = event => {
        event.preventDefault()

        this.goToView('google')
    }

    handleHolaNews = event => {
        event.preventDefault()

        this.goToView('hola-news')
    }

    handleSearchUsersResultsAndQuery = (results, query) =>
        this.setState({ usersResults: results, usersQuery: query })

    handleSearchGoogleResultsAndQuery = (results, query) =>
        this.setState({ googleResults: results, googleQuery: query })

    handleRetrieveHolaNewsResults = news =>
        this.setState({ holaNews: news })

    render() {
        return <section className="home">
            <h1>Welcome, {this.state.name}!</h1>
            <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : ''}`} href="" onClick={this.handleUsers}>Users </a>
            <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : ''}`} href="" onClick={this.handleGoogle}>Google </a>
            <a className={`home__link ${this.state.view === 'hola-news' ? 'home__link--active' : ''}`} href="" onClick={this.handleHolaNews}>Hola News </a>
            <button onClick={this.props.onLogout}>Logout</button>

            {this.state.view === 'spinner' && <Spinner />}
            {this.state.view === 'users' && <Users onSearch={this.handleSearchUsersResultsAndQuery} users={this.state.usersResults} query={this.state.usersQuery} token={this.props.token} onUserSessionExpired={this.props.onUserSessionExpired} />}
            {this.state.view === 'google' && <Google onSearch={this.handleSearchGoogleResultsAndQuery} results={this.state.googleResults} query={this.state.googleQuery} />}
            {this.state.view === 'hola-news' && <HolaNews onNews={this.handleRetrieveHolaNewsResults} news={this.state.holaNews} />}
        </section>
    }
}