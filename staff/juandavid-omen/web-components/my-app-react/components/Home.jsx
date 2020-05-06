 const {Component} = React;

 class Home extends Component {
    constructor() {
        super();

        this.state = {
            view: 'users',
            usersResults: undefined,
            usersQuery: undefined,
            googleResults: undefined,
            googleQuery: undefined,
            ecosiaResults: undefined,
            ecosiaQuery: undefined,
            news: undefined,
        }

    }

    componentDidMount() {
        try {
            retrieveUser(this.props.token, (error, user) => {
                if (error) {
                    throw error;
                }
                
                this.setState({name: user.name});
            });
        } catch (error) {       
            throw error;
        }
    }

     handleUsers = event => {
        event.preventDefault();

        this.setState({ view: 'users' });
     }

     handleGoogle = event => {
        event.preventDefault();    
        
        this.setState({ view: 'google' });
     }

     handleEcosia = event => {
        event.preventDefault();

        this.setState({ view: 'ecosia' });
     }

     handleNews = event => {
        event.preventDefault();

        this.setState({ view: 'news' });
     }

    handleTwitter = event => {
        event.preventDefault()

        this.setState({ view: 'twitter' })
    }

     handleSearchUsersResultsAndQuery = (results, query) => this.setState({ usersResults: results, usersQuery: query });

     handleSearchGoogleResultsAndQuery = (results, query) => this.setState({ googleResults: results, googleQuery: query });
    
    handleSearchEcosiaResultsAndQuery = (results, query) => this.setState({ ecosiaResults: results, ecosiaQuery: query });
         
    handleRetrieveNewsResults = news => this.setState({ news: news });
    
     render() {
         return <section className="home">
             <h1>Hello, {this.state.name} Welcome!</h1>
             <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : ''}`} href="" onClick={this.handleUsers}>Users</a>
             <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : ''}`} href="" onClick={this.handleGoogle}>Google</a>
             <a className={`home__link ${this.state.view === 'ecosia' ? 'home__link--active' : ''}`} href="" onClick={this.handleEcosia}>Ecosia</a>
             <a className={`home__link ${this.state.view === 'news' ? 'home__link--active' : ''}`} href="" onClick={this.handleNews}>News</a>
             <a className={`home__link ${this.state.view === 'twitter' ? 'home__link--active': ''}`} href="" onClick={this.handleTwitter}>Twitter</a>
             <button onClick={this.props.onLogout}>Logout</button>

             {this.state.view === 'users' && <Users onSearch={this.handleSearchUsersResultsAndQuery} users={this.state.usersResults} query={this.state.usersQuery} token={this.props.token} />}
             {this.state.view === 'google' && <Google onSearch={this.handleSearchGoogleResultsAndQuery} results={this.state.googleResults} query={this.state.googleQuery} />}
             {this.state.view === 'ecosia' && <Ecosia onSearch={this.handleSearchEcosiaResultsAndQuery} results={this.state.ecosiaResults} query={this.state.ecosiaQuery} />}
             {this.state.view === 'news' && <News onNews={this.handleRetrieveNewsResults} news={this.state.news} />}
             {this.state.view === 'twitter' && <Twitter getToken={this.props.token} />}
         </section>
     }
 }