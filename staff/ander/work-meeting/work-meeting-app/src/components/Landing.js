import React from 'react'
import logo from '../assets/logo.png'
import "./Landing.sass"
import { Link } from 'react-router-dom'

export default function () {
    return (<>
        <section className="landing">
            <img className='landing__image' src={logo}></img>
            <section className="landing__navigation">
                <Link to="/register">Register</Link> 
                 <Link to="/login">Login</Link>
            </section>
        </section>
    </>)
}