const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = {
            news: undefined,
            view: 'topheadlines',
            name: undefined
        }

    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash = hash ? hash : 'topheadlines'

                this.setState({name: user.name , view: hash ? hash : 'topheadlines' })

            })
        } catch (error) {
            throw error
        }
    }

    goToView = view => {
        location.hash = view === 'topheadlines' || view === 'search' || view === 'favorites' || view === 'profile' ? view : ''
        debugger
        this.setState({ view })
    }

    handleSearch = event => {
        event.preventDefault()

        this.goToView('search')
    }

    handleUser = event => {
        event.preventDefault()

        this.goToView('topheadlines')
    }
                                                                                                                
    handleFavorites = event => {
        event.preventDefault()

        this.goToView('favorites')
    }

    handleProfile = event => {
        event.preventDefault()

        this.goToView('profile')
    }

    handleTopHeadlines = news => {
        this.setState({ news })
    }

    render() {
        return <section className="home">
            <h1>Welcome, {this.state.name}!</h1>
            <a className={`home__link ${this.state.view === 'profile' ? 'home__link--active' : ''}`} href="" onClick={this.handleProfile}>Profile </a>
            <a className={`home__link ${this.state.view === 'favoirtes' ? 'home__link--active' : ''}`} href="" onClick={this.handleFavorites}>Favorites </a>
            <a className={`home__link ${this.state.view === 'topheadlines' ? 'home__link--active' : ''}`} href="" onClick={this.handleUser}>Top headlines</a>
            <a className={`home__link ${this.state.view === 'search' ? 'home__link--active' : ''}`} href="" onClick={this.handleSearch}>Search </a>
            <button onClick={this.props.onLogout}>Logout</button>

           
            {this.state.view === 'profile' && <Profile />}
            {this.state.view === 'favorites' && <Favorites />}
            {this.state.view === 'topheadlines' &&  <TopHeadlines myHeadlines={this.handleTopHeadlines} token={this.props.token} news={this.state.news}/>}
            {/* {this.state.view === 'search' && <Search />} */}
        </section>
    }
}