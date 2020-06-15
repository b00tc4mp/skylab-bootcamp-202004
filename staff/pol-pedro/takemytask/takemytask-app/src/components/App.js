import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter, Redirect } from 'react-router-dom'

function App() {
  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    setToken()
    delete sessionStorage.token

    history.push('/')
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <Hello name="Manuel" /> */}

        <Container>
          <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />

          <Route path="/register" render={() =>
            token ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />
          } />

          <Route path="/login" render={() =>
            token ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />
          } />

          <Route path="/home" render={() =>
            token ? <Home onLogout={handleLogout} token={token} /> : <Redirect to="/" />
          } />

          {/* demo http://localhost:3000/#/hello/WORLD */}
          <Route path="/hello/:name" render={props => <Hello name={props.match.params.name} />} />
        </Container>
      </header>
    </div>
  )
}

export default withRouter(App)
