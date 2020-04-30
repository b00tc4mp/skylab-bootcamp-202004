const { Component } = React;

class App extends Component {
  constructor() {
    super();

    this.state = {
      view: "landing",
      user: null
    };
  }

  handleGoToRegister = () => this.setState({ view: "register" });
  handleGoToLogin = () => this.setState({ view: "login" });
  handleGoToHome = () => this.setState({ view: "home" });

  handleRegister = (name, surname, email, password) => {
    registerUser(name, surname, email, password);

    this.setState({ view: "login" });
  };

  handleLogin = (email, password) => {
    const user = authenticateUser(email, password);

    this.setState({ view: "home", user });
  };

  render() {
    return (
      <>
        {this.state.view === "landing" && (
          <Landing
            onRegister={this.handleGoToRegister}
            onLogin={this.handleGoToLogin}
          />
        )}
        {this.state.view === "register" && (
          <Register
            onSubmit={this.handleRegister}
            onLogin={this.handleGoToLogin}
          />
        )}
        {this.state.view === "login" && (
          <Login
            goToHome={this.handleGoToHome}
            onSubmit={this.handleLogin}
            onRegister={this.handleGoToRegister}
          />
        )}
        {this.state.view === "home" && <Home user={this.state.user}/>}
      </>
    );
  }
}
