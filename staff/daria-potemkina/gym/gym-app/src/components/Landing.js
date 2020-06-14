import React from 'react'
import './Landing.sass'

import { Link } from 'react-router-dom'

export default function () {
    return <section className="landing">
        <img className = "logo" alt="logo" src="../Logo.png"></img>
        <section className="landing__nav"><Link className="landing__link" to="/register">Register</Link> <Link className="landing__link" to="/login">Login</Link></section>
    </section>
}