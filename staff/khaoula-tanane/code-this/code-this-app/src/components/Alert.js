import React from 'react'

export default function({ message, status }) {
    return <div className={`alert alert--${status}`}>
        <p>{message}</p>
    </div>
}