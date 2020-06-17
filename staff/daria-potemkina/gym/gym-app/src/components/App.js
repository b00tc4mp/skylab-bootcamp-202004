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
import Search from './Search'
import Settings from './Settings'
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isUserAuthenticated, retrieveFuturePrices, retrieveUnderlyingPrice } from 'gym-client-logic'

function App({ history }) {
  const [token, setToken] = useState()
  const [error, setError] = useState()
  const [prices, setPrices] = useState()
  const [underlying, setUnderlying] = useState()
  const [item, setItem] = useState()
  const [expanded, setExpanded] = useState()

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

  const handleGoToAccount = event => {
    event.preventDefault()

    if (expanded) setExpanded(false)
    else setExpanded(true)

    history.push('/account')
  }

  const handleToggle = event => {
    event.preventDefault()

    if (expanded) setExpanded(false)
    else setExpanded(true)
  }

  const handleGoToPortfolio = event => {
    event.preventDefault()

    if (expanded) setExpanded(false)
    else setExpanded(true)

    history.push('/portfolio')
  }

  const handleGoToNotifications = (event) => {
    event.preventDefault()

    if (expanded) setExpanded(false)
    else setExpanded(true)

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

        {token && <section >
          <nav className="nav-bar">
            <a href="/">  <FontAwesomeIcon icon={faHome} /></a>
            <button className="nav-bar__menu" href="/"> <FontAwesomeIcon icon={faBars} onClick={handleToggle} /></button>
            <ul className={`nav-bar__list${expanded ? '--expanded' : ''}`}>
              <li><a href="/" onClick={handleGoToPortfolio}>Portfolio</a></li>
              <li><a href="/" onClick={handleGoToNotifications}>Notifications</a></li>
              <li><a href="/" onClick={handleGoToAccount}>Account</a></li>
              <li><a href="/">Settings</a></li>
              <li><a href="/" onClick={handleLogout}>Logout</a> </li>
            </ul>
          </nav>
        </section>}
        {!expanded && <Search path="/search" handleGoToDetails={handleGoToDetails} />}

        {!expanded && <Route path="/home" render={() =>
          token ? <Home expanded={expanded} token={token} handleGoToDetails={handleGoToDetails} /> : <Redirect to="/login" />} />}
        
        <Route path="/product-details" render={() => 
        token && prices && <ProductDetails token={token} prices={prices} underlyings={underlying} item={item} />} />

        <Route path="/account" render={() => <Account token={token} />} />

        <Route path="/portfolio" render={() => <Portfolio token={token} />} />

        <Route path="/notifications" render={() => <Notifications />} />
       
        <Route path="/settings" render={() => <Settings />} />
      </header>
    </div>
  );
}

export default withRouter(App)
