import React from 'react'
import './Feedback.sass'

export default function({ message, status }) {
    return <div className={`alert alert--${status}`}>
        <p>{message}</p>
    </div>
}