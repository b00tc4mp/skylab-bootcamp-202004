import React from 'react'
import './style/Container.sass'

export default function ({ children }) {
    return <div className="container">
        <nav>TODO top navbar</nav>

        {children}

        <nav>TODO bottom navbar</nav>
    </div>
}