import React from 'react'
import './Navbar.sass'


export default function ({ onGoToHome, onLogout}) {
    return <nav className="navbar">
        <a href="#" className="navbar__item" onClick={onGoToHome}>Home</a>
        <a herf="#" className="navbar__item" onClick={onLogout}>Logout</a>        
        </nav>
           
}
