const { Component } = React

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
            errorTweets: undefined,
            tweets: undefined,
            following: this.props.following,
            toggleFollowError: undefined,
            
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

    handleGoToTwitter = (event) => {
        event.preventDefault()

        this.setState({view: 'twitter'})
    }

    handleGoToLogout = event => {
        event.preventDefault();

        this.props.onLogout()
    }

    handleFollowing = id =>{
        toggleFollowUser(this.props.token, id, error => {
            if(error) this.setState({toggleFollowError: error.message})
        })
        this.setState({view: 'users'})
    }


    render() {
        return <section className="home">
            <h1>Welcome {this.props.name}</h1>
            <a className="home__link" href="" onClick = {this.handleGoToUsers}>Users  </a>
            <a className="home__link" href="" onClick = {this.handleGoToGoogle}>Google  </a>
            <a className="home__link" href="" onClick = {this.handleGoToEcosia}>Ecosia  </a>
            <a className="home__link" href="" onClick={this.handleGoToTwitter}>Twitter  </a>
            <button onClick={this.handleGoToLogout}>Log out</button>

            <News />
            {this.state.view === 'users' && <Search onSubmit={this.handleSearchUsers} results = {this.state.usersResults} error = {this.state.errorUsers} following={this.props.following} toggleFollowUser={this.handleFollowing}/>}
            {this.state.view === 'google' && <Google onSubmit={this.handleGoogle} results = {this.state.googleResults} error = {this.state.errorGoogle}/>}
            {this.state.view === 'ecosia' && <Ecosia onSubmit={this.handleEcosia} resultsEco = {this.state.ecosiaResults} error = {this.state.errorEcosia}/>}
            {this.state.view === 'twitter' && <Twitter token={this.props.token}/>}
        </section>
    }
}