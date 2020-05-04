const { Component } = React;

class App extends Component {
  constructor() {
    super();

    this.state = {
      view: 'home',
      user: ''
    };
  }

  goToRegister = () => this.setState({ view: 'register' })
  goToLogin = () => this.setState({ view: 'login' })
  onLogout = () => {
    this.setState({ view: 'landing' })
    this.setState({ user: undefined })
    this.setState({ token: undefined })

  }


  registerSubmit = (name, surname, email, password) => {
    registerUser(name, surname, email, password, (error) => {
      if (error) throw new Error(error)
      else this.setState({ view: 'login' })
    })
  }

  loginSubmit = (email, password) => {
    authenticateUser(email, password, (error, token) => { // POR AQUI
      if (error) throw new Error(error)

      this.setState({ token })
      this.setState({ user: email })
      this.setState({ view: 'home' })
    })

  }


  render() {
    return <>
      {this.state.view === 'landing' && <Landing toRegister={this.goToRegister} toLogin={this.goToLogin} />}
      {this.state.view === 'register' && <Register onSubmit={this.registerSubmit} toLogin={this.goToLogin} />}
      {this.state.view === 'login' && <Login onSubmit={this.loginSubmit} toRegister={this.goToRegister} />}
      {this.state.view === 'home' && <Home token={this.state.token} userEmail={this.state.user} onLogout={this.onLogout} />}
    </>

  }
}
