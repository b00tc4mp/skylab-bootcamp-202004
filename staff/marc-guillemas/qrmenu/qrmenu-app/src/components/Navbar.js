import React from 'react'
import './Navbar.sass'

export default function({onChangeRoute, onLogout, active, onBurgerActive}) {
    return <nav className="navbar">

        <ul className={active ? "navbar__list" : "navbar__list navbar__list--active" }>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onBurgerActive(!active)
                    onChangeRoute('/orders')
                }}>Orders</a> 
            </li>
            <hr/>
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onBurgerActive(!active)
                    onChangeRoute('/tables')
                }}>Tables</a> 
            </li>
            <hr/>
            {/* <li>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onBurgerActive(!active)
                    onChangeRoute('/dishes')
                }}>Dishes</a> 
            </li>
            <hr/> */}
            {/* <li>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onBurgerActive(!active)
                    onChangeRoute('/qrcodes')
                }}>QR Codes</a> 
            </li>
            <hr/> */}
            {/* <li>
                <a href="" onClick={event => {
                    event.preventDefault()
                    onBurgerActive(!active)
                    onChangeRoute('/admin')
                }}>Admin</a> 
            </li>
            <hr/> */}
            <li>
                <a href="" onClick={event => {
                    event.preventDefault()

                    onLogout()
                }}>Logout</a> 
            </li>
        </ul>
    </nav>
}