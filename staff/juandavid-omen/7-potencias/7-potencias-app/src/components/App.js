import React, { useState, useEffect } from 'react'
import { Landing, Login, Register, Home, NavBar, Products, Footer, CartDropdown, SideBar, Checkout, Order } from '../components'
import { isUserSessionValid, logoutUser, isUserLoggedIn, updateCart, retrieveCart, retrieveUser, deleteCart, placeOrder } from '7-potencias-client-logic'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { useOutsideClick } from '../hooks/outsideClick'
import './App.sass'

export default withRouter(function ({ history }) {
  const [view, setView] = useState()
  const [cart, setCart] = useState([])
  const [error, setError] = useState()
  const [name, setName] = useState()
  const [sideBarHidden, setSideBarHidden] = useState()
  const [numItemsCart, setNumItemsCart] = useState(0)

  const { hidden: cartDropdownHidden, setHidden: setCartDropdownHidden, ref } = useOutsideClick(true)

  useEffect(() => {
    setCartDropdownHidden(true)
    setSideBarHidden(true)

    if (isUserLoggedIn()) {
      try {
        isUserSessionValid()
          .then(isAuthenticated => {
            if (isAuthenticated) {
              doRetrieveCart()
              setView('home')
            }
          })
          .catch(error => { throw error })
      } catch (error) {
        if (error) throw error
      }
    } else history.push('/')
  }, [history])

  const doRetrieveCart = () => {
    retrieveCart()
      .then(cart => {
        setCart(cart)
        let total = 0
        for (const productSelection of cart) {
          total += productSelection.quantity
        }
        setNumItemsCart(total)
      })
      .catch(error => { throw error })
  }
  const handleGoToRegister = () => history.push('/register')

  const handleRegister = () => history.push('./login')

  const handleLogin = () => {
    try {
      retrieveUser()
        .then(({ name }) => {
          setName(name)
          doRetrieveCart()
        })
        .catch(error => setError(error.message))
    } catch ({ message }) {
      setError(message)
    }
    history.push('/home')
  }

  const handleGoToLogin = () => history.push('/login')

  const handleLogout = () => {
    logoutUser()
    setCart([])
    setNumItemsCart(0)
    history.push('/')
  }

  const toggleHiddenDropdown = () => {
    setCartDropdownHidden(!cartDropdownHidden)
    setSideBarHidden(!sideBarHidden)
  }

  const toggleSideBar = () => {
    setSideBarHidden(!sideBarHidden)
  }

  const addToCart = (id, name, price) => {
    const newCart = cart.slice()
    let quantity = 1

    const index = newCart.findIndex(item => item.product._id === id)

    if (index === -1) {
      newCart.push({ product: id, quantity: quantity, name: name, price: price })
    } else {
      quantity = ++newCart[index].quantity
    }

    try {
      updateCart(id, quantity, cart)
        .then((cart) => {
          setError(undefined)
          setCart(cart)
          setNumItemsCart(prevValue => ++prevValue)
        })
        .catch(({ message }) => {
          setError(message)
        })
    } catch ({ message }) {
      setError(message)
    }
  }

  const handleDeleteCart = () => {
    if (isUserLoggedIn()) {
      try {
        deleteCart()
          .then(() => {
            setError(undefined)
            setCart([])
            setNumItemsCart(0)
          })
          .catch(({ message }) => {
            setError(message)
          })
      } catch ({ message }) {
        setError(message)
      }
    }
  }

  const handlePlacerOrder = () => {
    if (isUserLoggedIn()) {
      try {
        placeOrder()
          .then(() => {
            setError(undefined)
            setCart([])
            setNumItemsCart(0)
          })
          .catch(({ message }) => {
            setError(message)
          })
      } catch ({ message }) {
        setError(message)
      }
      history.push('/order')
    }
  }

  return (
    <div className='app'>
      <NavBar onLogout={handleLogout} validateUserLogged={isUserLoggedIn} toggleHiddenDropdown={toggleHiddenDropdown} cartToggleRef={ref} quantityCart={numItemsCart} toggleSideBar={toggleSideBar} />
      <main>
        {cartDropdownHidden ? null : (<CartDropdown key='cartDropdown' reference={ref} cart={cart} removeCart={handleDeleteCart} />)}
        {sideBarHidden ? null : (<SideBar onLogout={handleLogout} validateUserLogged={isUserLoggedIn} toggleHiddenDropdown={toggleHiddenDropdown} />)}
        <Route exact path='/' render={() => <Landing />} />
        <Route path='/register' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} />} />
        <Route path='/login' render={() => isUserLoggedIn() ? <Redirect to='/home' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} />} />
        <Route path='/home' render={() => isUserLoggedIn() ? <Home name={name} cart={cart} onLogout={handleLogout} /> : <Redirect to='/' />} />
        <Route path='/lessons' render={() => <Products key='products' addToCart={addToCart} removeCart={handleDeleteCart} />} />
        <Route path='/checkout' render={() => <Checkout cart={cart} removeCart={handleDeleteCart} checkout={handlePlacerOrder} />} />
        <Route path='/order' render={() => <Order />} />
      </main>
      <Footer />
    </div>
  )
})
