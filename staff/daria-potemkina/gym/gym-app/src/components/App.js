import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './App.sass'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import './NavBar.sass'
import Landing from './Landing'
import ProductDetails from './ProductDetails'
import Account from './Account'
import Portfolio from './Portfolio'
import Notifications from './Notifications'
import { isUserAuthenticated, retrieveFuturePrices, retrieveUnderlyingPrice } from 'gym-client-logic'

function App({ history }) {
  const [token, setToken] = useState()
  const [error, setError] = useState()
  const [prices, setPrices] = useState()
  const [underlying, setUnderlying] = useState()
  const [item, setItem] = useState()

  useEffect(() => {
    if (sessionStorage.token) {
      try {
        isUserAuthenticated(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setToken(sessionStorage.token)
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        setError(error)
      }
    } else history.push('/')
  }, [history])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('/login')

  const handleLogin = token => {
    sessionStorage.token = token
    setToken(token)

    history.push('/home')
  }

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    setToken()
    delete sessionStorage.token

    history.push('/')
  }

  const handleGoToAccount = event =>{
    event.preventDefault()

    history.push('/account')
  }

  const handleGoToPortfolio = event =>{
    event.preventDefault()

    history.push('/portfolio')
  }

  const handleGoToNotifications = event =>{
    event.preventDefault()

    history.push('/notifications')
  }

  const handleGoToDetails = item => {
    setItem(item)
    try {
      retrieveFuturePrices(item._id)
        .then(prices => setPrices(prices))
        .then(() => retrieveUnderlyingPrice(item.ticker))
        .then(underlying => setUnderlying(underlying))
        .then(() => history.push("/product-details"))
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" render={() => token ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />
        <Route path="/register" render={() =>
          token ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />

        <Route path="/login" render={() =>
          token ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />

        {token && <section className="nav-bar">
          <nav className="nav-bar">
            <input alt="button" type="image" src="/logo-mini.png" className="nav-bar__button"></input>
            <ul className="nav-bar__list nav-bar__list--open">
              <li><a href="/home"> Home</a></li>
              <li><a href="/portfolio" onClick = {handleGoToPortfolio}>Portfolio</a></li>
              <li><a href="/notifications" onClick = {handleGoToNotifications}>Notifications</a></li>
              <li><a href="/account" onClick={handleGoToAccount}>Account</a></li>
              {/* <li><a href="/settings">Settings</a></li> */}
              <li><a href="/" onClick={handleLogout}>Logout</a> </li>
            </ul>
            <button className="nav-bar__button">|||</button>
          </nav>
        </section>}

        <Route path="/home" render={() =>
          token ? <Home token={token} handleGoToDetails={handleGoToDetails} /> : <Redirect to="/login" />} />
        <Route path="/product-details" render={() => prices && <ProductDetails token={token} prices={prices} underlyings={underlying} item={item} />} />
        <Route path="/account" render={() => <Account token={token}/>}/>
        <Route path="/portfolio" render={() => <Portfolio />}/>
        <Route path="/notifications" render={() => <Notifications />}/>
      </header>
    </div>
  );
}

export default withRouter(App)
