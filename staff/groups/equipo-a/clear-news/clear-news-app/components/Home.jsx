const { Component } = React

class Home extends Component {
    constructor() {
        super()

    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash = hash? hash : 'profile'

                this.setState({view: hash? hash : 'profile' })
            })
        } catch (error) {
            throw error
        }
    }

    goToView = view => {
        location.hash = view === 'user' || view === 'search' || view === 'favorites' || view === 'profile' ? view : ''

        this.setState({ view })
    }

    handleSearch = event => {
        event.preventDefault()

        this.goToView('search')
    }

    handleUser = event => {
        event.preventDefault()

        this.goToView('user')
    }

    handleFavorites = event => {
        event.preventDefault()

        this.goToView('favorites')
    }

    handleProfile = event => {
        event.preventDefault()

        this.goToView('profile')
    }

    render() {
        return <section className="home">
            <h1>Welcome, {this.state.name}!</h1>
            <a className={`home__link ${this.state.view === 'profile' ? 'home__link--active' : ''}`} href="" onClick={this.handleProfile}>Profile </a>
            <a className={`home__link ${this.state.view === 'favoirtes' ? 'home__link--active' : ''}`} href="" onClick={this.handleFavorites}>Favorites </a>
            <a className={`home__link ${this.state.view === 'user' ? 'home__link--active' : ''}`} href="" onClick={this.handleUser}>User </a>
            <a className={`home__link ${this.state.view === 'search' ? 'home__link--active' : ''}`} href="" onClick={this.handleSearch}>Search </a>
            <button onClick={this.props.onLogout}>Logout</button>
       
            {this.state.view === 'profile' && <Profile />}
            {this.state.view === 'favorites' && <Favorites />}
            {this.state.view === 'user' && <User />}
            {this.state.view === 'search' && <Search />}
        </section>
    }
}