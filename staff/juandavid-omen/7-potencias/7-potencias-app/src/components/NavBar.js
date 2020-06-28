import React from 'react'
import './NavBar.sass'
import { Link } from 'react-router-dom'
import CartToggle from './CartToggle'

export default function ({ onLogout, token, toggleHiddenDropdown, cartToggleRef }) {
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
        {!!token && (<>
          <div className='checkout-container'>
            <div className='checkout-icon' />
            <button onClick={onLogout}>LOGOUT</button>
          </div>
        </>)}
        {!token && (<>
          <div className='register-container'>
            <div className='register-icon' />
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </div>
        </>)}
        <div className='icons-container'>
          <CartToggle toggleHiddenDropdown={toggleHiddenDropdown} reference={cartToggleRef} />
          <div className='shopping_amount'>
            <div className='amount'>0</div>
          </div>
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
