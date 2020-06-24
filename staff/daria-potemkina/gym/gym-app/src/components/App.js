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
import Settings from './Settings'
import Search from './Search'
import Feedback from './Feedback'
import { faHome, faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isUserSessionValid, isUserLoggedIn, logoutUser } from 'gym-client-logic'


function App({ history }) {
  const [error, setError] = useState()
  const [ticker, setTicker] = useState()
  const [expanded, setExpanded] = useState()
  const [itemId, setItemId] = useState()

  useEffect(() => {
    if (isUserLoggedIn())
      try {
        isUserSessionValid()
          .then(isAuthenticated => {
            
            if (!isAuthenticated) {
              history.push('/')
            }
          })
          .catch(error => setError(error.message))
      } catch (error) {
        setError(error.message)
      }
    else history.push('/')
  }, [])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('/login')

  const handleLogin = () => {

    history.push('/home')
  }

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()

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

  const handleGoToSettings = event => {
    event.preventDefault()

    if (expanded) setExpanded(false)
    else setExpanded(true)

    history.push('/settings')
  }

  const handleGoToSearch = event => {
    event.preventDefault()

    if (expanded) setExpanded(false)
    else setExpanded(true)

    history.push('/search')
  }

  const handleGoToDetails = item => {
    setItemId(item._id)
    setTicker(item.ticker)
    
    history.push(`/product-details/${item._id}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Route exact path="/" render={() => isUserLoggedIn() ? <Redirect to="/home" /> : <Landing onGoToRegister={handleGoToRegister} onGoToLogin={handleGoToLogin} />} />

        <Route path="/register" render={() =>
          isUserLoggedIn() ? <Redirect to="/home" /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />

        <Route path="/login" render={() =>
          isUserLoggedIn() ? <Redirect to="/home" /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />

        {isUserLoggedIn() && <section >
          <nav className="nav-bar">
            <a className="nav-bar__home" href="/">  <FontAwesomeIcon transform="down-6 grow-7" icon={faHome} /></a>
            <button className="nav-bar__menu" href="/"> <FontAwesomeIcon size="sm" icon={faBars} onClick={handleToggle} /></button>
            <ul className={`nav-bar__list${expanded ? '--expanded' : ''}`}>
              <li><a href="/" onClick={handleGoToSearch}>Search</a></li>
              <li><a href="/" onClick={handleGoToPortfolio}>Portfolio</a></li>
              <li><a href="/" onClick={handleGoToAccount}>Account</a></li>
              <li><a href="/" onClick={handleGoToSettings}>Settings</a></li>
              <li><a href="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /></a> </li>
            </ul>
          </nav>
        </section>}

        {!expanded && <Route path="/home" render={() =>
          isUserLoggedIn() ? <Home expanded={expanded} handleGoToDetails={handleGoToDetails} /> : <Redirect to="/login" />} />}

        {!expanded && <Route exact path="/product-details/:itemId" render={() =>
        isUserLoggedIn() &&  <ProductDetails expanded={expanded} history={history} ticker={ticker} id={itemId} />} />}

        {!expanded && <Route path="/search" render={() => <Search history={history} handleGoToDetails={handleGoToDetails} />} />}

        {!expanded && <Route path="/account" render={() => <Account />} />}

        {!expanded && <Route path="/portfolio" render={() => <Portfolio />} />}

        {!expanded && <Route path="/settings" render={() => <Settings />} />}

      </header>
      
      {error && <Feedback message={error} level="error" />}
    </div>
  );
}

export default withRouter(App)
