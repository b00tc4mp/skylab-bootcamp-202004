import React from 'react'

export default function ({ children }) {
    return <div className="container">
        <nav>nabvar...</nav>

        { children }

        <nav>navbar</nav>
    </div>
}