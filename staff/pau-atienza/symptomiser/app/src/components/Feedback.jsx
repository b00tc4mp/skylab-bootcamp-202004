import React from 'react'

export default function( { message, level } ) {

    return <section className = "feedback">
        <p className = {`feedback__message--${level}`} >{level}: {message}</p>
    </section>
}