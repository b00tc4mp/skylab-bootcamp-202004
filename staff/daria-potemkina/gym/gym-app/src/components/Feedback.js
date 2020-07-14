import React from 'react'

export default function({message, level}){
    return <p className={`feedback feedback--${level}`}>{message}</p>
}