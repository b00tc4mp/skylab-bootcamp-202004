import React from 'react'
import './Navbar.sass'

export default function({onChangeView, onLogout, active}) {
    
    return <nav className="navbar">

        <ul className={active ? "navbar__list" : "navbar__list navbar__list--active" }>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()

                    onChangeView('/orders')
                }}>Orders</a> 
            </li>
            <hr/>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()

                    onChangeView('/tables')
                }}>Tables</a> 
            </li>
            <hr/>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()

                    onChangeView('/qrcodes')
                }}>QR Codes</a> 
            </li>
            <hr/>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()

                    onChangeView('/admin')
                }}>Admin</a> 
            </li>
            <hr/>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()

                    onLogout()
                }}>Logout</a> 
            </li>
        </ul>
    </nav>
}