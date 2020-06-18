import React from 'react'
import { Link } from 'react-router-dom'

export default function( { children, history } ) {

    return <>
    <section className="navigation">
        <Link className="navigation__link" to="/">Search</Link>
        {history.location.pathname !== '/symptomlist' && <Link className="navigation__link" to="/symptomlist">List</Link>}
        {history.location.pathname !== '/about' && <Link className="navigation__link" to="/about">About</Link>}
    </section>
    {children}
    </>
}