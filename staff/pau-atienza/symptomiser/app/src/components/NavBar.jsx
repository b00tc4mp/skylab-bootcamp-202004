import React from 'react'
import { Link } from 'react-router-dom'

export default function( { children } ) {

    return <>
    <section className="navigation">
        <Link className="navigation__link" to="/">Search</Link>
        <Link className="navigation__link" to="/symptomlist">List</Link>
        <Link className="navigation__link" to="/about">About</Link>
    </section>
    {children}
    </>
}




