import React from 'react'


export default function ({ onGoToHome, onLogout}) {
    return <nav className="navbar">
        <a href="#" className="navbar__item" onClick={onGoToHome}>Home</a>
        <button className="navbar__item" onClick={onLogout}>Logout</button>        
        </nav>
           
}
