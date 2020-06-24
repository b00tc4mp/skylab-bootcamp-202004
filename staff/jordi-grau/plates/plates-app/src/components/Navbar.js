import React from 'react'


export default function ({ onSearch, onGoToHome, onLogout}) {
    return <nav className="navbar">
        <a href="#" className="navbar__item" onClick={onGoToHome}>Home</a>
        <a href="#" className="navbar__item" onClick={onSearch}>Search</a>
        <a href="#" className="navbar__item" onClick={onLogout}>Logout</a>
        
        </nav>
       
    
}


