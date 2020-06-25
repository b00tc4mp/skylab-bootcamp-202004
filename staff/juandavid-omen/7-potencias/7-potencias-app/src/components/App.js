import React, { useState, useEffect } from 'react'
import { Login, Register, Home, Landing, NavBar, Products, ShoppingCart, Feedback, Footer, CartDropdown } from '../components'
import { isUserSessionValid, logoutUser, isUserLoggedIn, updateCart } from '7-potencias-client-logic'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './App.sass'

export default withRouter(function ({ history }) {
  const [view, setView] = useState()
  const [cart, setCart] = useState([])
  const [error, setError] = useState()
  const [cartDropdownHidden, setCartDropdownHidden] = useState()

  useEffect(() => {
    setCartDropdownHidden(false)

    if (sessionStorage.token) {
      try {
        isUserSessionValid(sessionStorage.token)
          .then(isAuthenticated => {
            if (isAuthenticated) {
              setView('home')
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    } else history.push('/')
  }, [history])

  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => history.push('/home')

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()

    history.push('/')
  }

  const toggleHiddenDropdown = () => {
    setCartDropdownHidden(!cartDropdownHidden)
  }

  const addToCart = (id, name, price) => {
    let quantity = 1

    const index = cart.findIndex(item => item.productId === id)

    if (index === -1) {
      cart.push({ productId: id, quantity: quantity, name: name, price: price })
    } else {
      quantity = ++cart[index].quantity
    }

    try {
      updateCart(sessionStorage.token, id, quantity)
        .then(() => {
          setError(undefined)
          setCart(cart)
        })
        .catch(({ message }) => {
          setError(message)
        })
    } catch ({ message }) {
      setError(message)
    }
  }

  return (
    <div className='app'>
      <NavBar onLogout={handleLogout} token={sessionStorage.token} toggleHiddenDropdown={toggleHiddenDropdown} />
      <main>
        {cartDropdownHidden ? null : (<CartDropdown cart={cart} toggleHidden={toggleHiddenDropdown} />)}
        <Route exact path='/' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />
        <Route path='/register' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />
        <Route path='/login' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />
        <Route path='/home' render={() => isUserLoggedIn() ? <Home onLogout={handleLogout} /> : <Redirect to='/' />} />
        <Route path='landing' render={() => <Landing />} />
        <Route path='/lessons' render={() => <Products token={sessionStorage.token} addToCart={addToCart} />} />
      </main>

      <Footer />

    </div>
  )
})
