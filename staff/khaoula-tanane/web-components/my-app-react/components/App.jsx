
const { Component } = React;

function App(){


  handleGoToRegister = () => this.setState({ view: "register" });
  handleGoToLogin = () => this.setState({ view: "login" });
  handleGoToHome = (token) => this.setState({ token, view: "home" });

  

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
            onLogin={this.handleGoToLogin}
          />
        )}
        {this.state.view === "login" && (
          <Login
            goToHome={this.handleGoToHome}
            onRegister={this.handleGoToRegister}
          />
        )}
        {this.state.view === "home" && <Home token={this.state.token}/>}
      </>
    );
  }

