class Home extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            user: this.props.user,
            view: 'users',
            usersResults: undefined,
            usersQuery: undefined,
            googleResults: undefined,
            googleError: undefined,
            googleQuery: undefined
        }
    }

    // displayView = view => {this.setState({ view:view })}

    // handleUsers = event => {
    //     event.preventDefault()
                
    //     this.displayView('users')
    // }

    // handleGoogle = event => {
    //     event.preventDefault()
                
    //     this.displayView('google')
    // }

    // handleNews = event => {
    //     event.preventDefault()
    
    //     this.displayView('news')
    // }

    // handleTwitter = event => {
    //     event.preventDefault()
    
    //     this.displayView('twitter')
    // }

    // handleSearchUsers = query => {
    //     const users = searchUsers(query)
    //     this.setState({ usersResults: users, usersQuery: query})
    // }

    // handleGoogleSearch = query => {
    //     google(query, (error, results) => {
    //         if (error) this.setState({googleError: error.message})
    //         else this.setState({googleResults: results})
    //     })
    //     this.setState({googleQuery: query})
    // }

    render() {
        return <section className="home">
            <h1>Welcome, {'BARON'}!</h1>
            <a className={`home__link ${this.state.view === 'users' ? 'home__link--active' : '' }`} href="" onClick={this.handleUsers}> Users </a>
            <a className={`home__link ${this.state.view === 'google' ? 'home__link--active' : '' }`} href="" onClick={this.handleGoogle}> Google </a>
            <a className={`home__link ${this.state.view === 'news' ? 'home__link--active' : '' }`} href="" onClick={this.handleNews}> Hola News </a>
            <a className={`home__link ${this.state.view === 'twitter' ? 'home__link--active' : '' }`} href="" onClick={this.handleTwitter}> Twitter </a>
            <button onClick={() => {
                this.props.onLogout()
            }}>Logout</button>

            {/* {this.state.view === 'users' && <Users usersResults={this.state.usersResults} handleSearchUsers={this.handleSearchUsers} query={this.state.usersQuery}/>}
            {this.state.view === 'google' && <Google googleResults={this.state.googleResults} googleError={this.state.googleError} handleGoogleSearch={this.handleGoogleSearch} query={this.state.googleQuery}/>}
            {this.state.view === 'news' && <HolaNews />}
            {this.state.view === 'twitter' && <Tweet email={this.state.user.email}/>} */}
        </section>
    }

}    

