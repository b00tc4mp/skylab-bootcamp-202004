import React, { useState, useEffect } from 'react'
import './NavBar.sass'
import { Link } from 'react-router-dom'

export default function ({ onLogout, token }) {
  return (
    <header className='toolbar'>
      <nav className='toolbar__navigation'>
        <div className='toolbar__logo'>
          <a />
        </div>
        <div className='spacer' />
        <div className='toolbar__navigation-items'>
          <ul>
            <Link to='landing'>Home</Link>
            <Link to='/lessons'>Classes Online</Link>
          </ul>
        </div>
        <div className='spacer2' />
        {!!token && (<>
          <div className='checkout-container'>
            <div className='checkout-icon' />
            <a onClick={onLogout}>LOGOUT</a>
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
          <div className='shopping_cart' />
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
