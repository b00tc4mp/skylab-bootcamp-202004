const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = {
            favNews: undefined,
            news: undefined,
            pages: undefined,
            view: 'topheadlines',
            name: undefined,
            searchNewsResults: undefined,
            newsQuery: undefined,
            newsLanguage: undefined,
            sortBy: undefined
        }

    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash = hash ? hash : 'topheadlines'

                this.setState({ name: user.name, view: hash ? hash : 'topheadlines' })

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

    handleTopHeadlines = (news, pages) => {
        this.setState({ news, pages })
    }

    handleFavoritesNews = favNews => {
        this.setState({favNews})
    }

    handleSearchNews = (results, query, language, sortBy) =>{
        this.setState({searchNewsResults: results, newsQuery: query, newsLanguage: language, sortBy})
    }

    render() {
        return <section className="home">
            <nav className="home__nav-bar">
                <h1>Welcome, {this.state.name}!</h1>
                <a className={`home__link ${this.state.view === 'profile' ? 'home__link--active' : ''}`} href="" onClick={this.handleProfile}>Profile </a>
                <a className={`home__link ${this.state.view === 'favorites' ? 'home__link--active' : ''}`} href="" onClick={this.handleFavorites}>Favorites </a>
                <a className={`home__link ${this.state.view === 'topheadlines' ? 'home__link--active' : ''}`} href="" onClick={this.handleUser}>Top headlines</a>
                <a className={`home__link ${this.state.view === 'search' ? 'home__link--active' : ''}`} href="" onClick={this.handleSearch}>Search </a>
                <button onClick={this.props.onLogout}>Logout</button>
            </nav>

            {this.state.view === 'profile' && <Profile token={this.props.token}/>}
            {this.state.view === 'favorites' && <Favorites token={this.props.token} myFavorite={this.handleFavoritesNews} favNews={this.state.favNews}/>}
            {this.state.view === 'topheadlines' && <TopHeadlines myHeadlines={this.handleTopHeadlines} token={this.props.token} news={this.state.news} pages={this.state.pages}/>}
            {this.state.view === 'search' && <SearchNews token={this.props.token} onSearch={this.handleSearchNews} searchNewsResults={this.state.searchNewsResults} query={this.state.newsQuery} language={this.state.newsLanguage} sortBy={this.state.sortBy}/>}

        </section>
    }
}