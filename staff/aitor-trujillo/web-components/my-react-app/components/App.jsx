const { Component } = React;

class App extends Component {
  constructor() {
    super();

    this.state = {
      view: 'landing',
      user: ''
    };
  }

  goToRegister = () => this.setState({ view: 'register' })
  goToLogin = () => this.setState({ view: 'login' })
  onLogout = () => {
    this.setState({ view: 'landing' })
    this.setState({ user: '' })

  }


  registerSubmit = (name, surname, email, password) => {
    registerUser(name, surname, email, password)
    this.setState({ view: 'login' })
  }

  loginSubmit = (email, password) => {
    authenticateUser(email, password)
    const _user = retrieveUser(email)
    this.setState({ view: 'home' })
    this.setState({ user: _user })
    // <Home />
  }


  render() {
    return <>
      <h1>Hello there!</h1>
      {this.state.view === 'landing' && <Landing toRegister={this.goToRegister} toLogin={this.goToLogin} />}
      {this.state.view === 'register' && <Register onSubmit={this.registerSubmit} toLogin={this.goToLogin} />}
      {this.state.view === 'login' && <Login onSubmit={this.loginSubmit} toRegister={this.goToRegister} />}
      {this.state.view === 'home' && <Home name={this.state.user.name} onLogout={this.onLogout} />}
    </>

  }
}
