const { Component } = React

class Home extends Component {
    constructor() {
        super()

        this.state = {
            favNews: undefined,
            news: undefined,
            pagesInTopHeadlines: undefined,
            pagesInSearch: undefined,
            view: 'topheadlines',
            name: undefined,
            searchNewsResults: undefined,
            newsQuery: undefined,
            newsLanguage: undefined,
            sortBy: undefined,
            categories: undefined,
            country: undefined,
            headlines: undefined,
            error: undefined
        }

    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) throw error

                const hash = location.hash.substring(1)

                location.hash = hash ? hash : 'topheadlines'

                this.setState({ name: user.name, categories: user.categories, country: user.country, headlines: user.headlines, view: hash ? hash : 'topheadlines' })

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

        // retrieveFavoriteTopHeadlines(this.props.token, (error, headlines) =>{
        //     if(error) this.setState({error: error.message})
        //     this.setState({headlines})
        // })

        // retrieveFavNews(this.props.token, (error, favNews) => {
        //     if (error) this.setState({error: error.message})
        //     this.setState({favNews})
        // })
    }

    handleProfile = event => {
        event.preventDefault()

        this.goToView('profile')
    }

    handleTopHeadlines = (news, pages) => {
        this.setState({ news, pagesInTopHeadlines: pages })
    }

    handleFavoritesNews = favNews => {
        this.setState({favNews})
    }

    handleFavoritesHeadlines = headlines =>{
        this.setState({headlines})
    }

    handleSearchNews = (results, query, language, sortBy, pages) =>{
        this.setState({searchNewsResults: results, newsQuery: query, newsLanguage: language, sortBy, pagesInSearch: pages})
    }

    render() {
        return <section className="home">
            <nav className="home__nav-bar">
                <a className={`home__link ${this.state.view === 'profile' ? 'home__link--active' : ''}`} href="" onClick={this.handleProfile}>Profile </a>
                <a className={`home__link ${this.state.view === 'favorites' ? 'home__link--active' : ''}`} href="" onClick={this.handleFavorites}>Favorites </a>
                <a className={`home__link ${this.state.view === 'topheadlines' ? 'home__link--active' : ''}`} href="" onClick={this.handleUser}>Top headlines</a>
                <a className={`home__link ${this.state.view === 'search' ? 'home__link--active' : ''}`} href="" onClick={this.handleSearch}>Search </a>
                <h1 className="home__user-name">{this.state.name}</h1>
                <button className="home__logout"onClick={this.props.onLogout}>Logout</button>
            </nav>
            <img className="home__logo" src="images/logo.png"></img>
            {this.state.view === 'profile' && <Profile token={this.props.token} categories={this.state.categories} country={this.state.country}/>}
            {this.state.view === 'favorites' && <Favorites token={this.props.token} myFavorite={this.handleFavoritesNews} favNews={this.state.favNews} myHeadlines={this.handleFavoritesHeadlines} headlines={this.state.headlines}/>}
            {this.state.view === 'topheadlines' && <TopHeadlines myHeadlines={this.handleTopHeadlines} token={this.props.token} news={this.state.news} pages={this.state.pagesInTopHeadlines}/>}
            {this.state.view === 'search' && <SearchNews token={this.props.token} onSearch={this.handleSearchNews} searchNewsResults={this.state.searchNewsResults} query={this.state.newsQuery} language={this.state.newsLanguage} sortBy={this.state.sortBy} pages={this.state.pagesInSearch}/>}

        </section>
    }
}