import React from 'react'
import './NavBar.sass'
import { Link } from 'react-router-dom'
import CartToggle from './CartToggle'
import CartQuantityIcon from './CartQuantityIcon'

export default function ({ onLogout, validateUserLogged, toggleHiddenDropdown, cartToggleRef, quantityCart }) {
  return (
    <header className='toolbar'>
      <nav className='toolbar__navigation'>
        <div className='toolbar__logo' />
        <div className='spacer' />
        <div className='toolbar__navigation-items'>
          <ul>
            <Link to='home'>Home</Link>
            <Link to='/lessons'>Classes Online</Link>
          </ul>
        </div>
        <div className='spacer2' />
        {validateUserLogged() && (<>
          <div className='checkout-container'>
            <div className='checkout-icon' />
            <button onClick={onLogout}>LOGOUT</button>
          </div>
        </>)}
        {!validateUserLogged() && (<>
          <div className='register-container'>
            <div className='register-icon' />
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </div>
        </>)}
        <div className='icons-container'>
          <CartToggle toggleHiddenDropdown={toggleHiddenDropdown} reference={cartToggleRef} />
          <CartQuantityIcon quantity={quantityCart} />
        </div>
        <button className='toggle-button'>
          <div className='toggle-button__line' />
          <div className='toggle-button__line' />
          <div className='toggle-button__line' />
        </button>
      </nav>
    </header>
  )
}
