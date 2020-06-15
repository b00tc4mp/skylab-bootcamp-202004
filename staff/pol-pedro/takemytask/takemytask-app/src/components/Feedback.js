import React from 'react'
import './style/Feedback.sass'

export default function({ message, level }) {
    return <p className={`feedback feedback--${level}`}>{message}</p>
}