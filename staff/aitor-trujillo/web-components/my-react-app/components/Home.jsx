
const { Component } = React

class Home extends Component {
  constructor() {
    super()

    this.state = {
      search: 'users',
      results: false
    }
  }

  handleLogout = e => {
    e.preventDefault()

    this.props.onLogout()
  }

  usersSearch = e => {
    e.preventDefault()

    this.setState({ results: false })
    this.setState({ search: 'users' })
  }

  googleSearch = e => {
    e.preventDefault()

    this.setState({ results: false })
    this.setState({ search: 'google' })
  }
  twitterFeed = e => {
    e.preventDefault()

    this.setState({ results: false })
    this.setState({ search: 'feed' })
  }

  handleQuery = (request) => {
    if (this.state.search === 'users') {
      searchUsers(request, this.props.token, (error, usersFound) => {
        if (error) throw new Error(error)

        if (usersFound.length)
          this.setState({ results: usersFound })
        else
          this.setState({ results: [] })

      })

      //usersFound.length ? 
      // : this.setState({ results: [] })

    } else if (this.state.search === 'google') {
      google(request, (queryResults) => {
        queryResults.length ? this.setState({ results: queryResults })
          : this.setState({ results: [] })

      })

    }
  }

  render() {
    return <section className="home-nav"><h1>Welcome!</h1>
      <a href="#" onClick={this.usersSearch}>Users Search </a>
      <a href="#" onClick={this.googleSearch}>Google Search </a>
      <a href="#" onClick={this.twitterFeed}>Twitter Feed</a>
      <button className="logout-button" onClick={this.handleLogout}>Log out</button>

      {this.state.search === 'users' && <UsersResults results={this.state.results} userToken={this.props.token} userEmail={this.props.userEmail} searchSubmit={this.handleQuery} />}
      {this.state.search === 'google' && <GoogleResults results={this.state.results} searchSubmit={this.handleQuery} />}
      {this.state.search === 'feed' && <Feed results={this.state.results} userToken={this.props.token} />}
    </section>
  }
}