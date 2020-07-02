import React from 'react'
import './Navbar.sass'


export default function ({ onGoToHome, onLogout}) {
    return <nav className="navbar">
        <img src="home-icon.png"  className="navbar__item" onClick={onGoToHome} />
        <a  className="navbar__item" onClick={onLogout}>Logout</a>        
        </nav>
           
}
