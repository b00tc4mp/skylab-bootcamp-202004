import React from 'react'
import './Container.sass'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'

export default function ({ children }) {
  return (
    <section className='container'>
      <nav>
      <Link to='/'><img className='nav_log-img' src={logo} alt='7Potencias' /></Link>
      <a className='navbar__link' href='#'>Classes Online</a>
      <a className='navbar__link' href='#'>On-site Group Classes</a>
      <a className='navbar__link' href='#'>Personalized Classes</a>
    </nav >
    {children}
    </section>
  )
}
