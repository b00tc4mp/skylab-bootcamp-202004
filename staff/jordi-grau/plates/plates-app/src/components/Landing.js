import React from 'react'
import './Landing'

import { link } from 'react-router-dom' 

export default function () {
    return <section className="landing">
        <link to="/register">Register</link> or <link to="/login">Login</link>
    </section>
}
