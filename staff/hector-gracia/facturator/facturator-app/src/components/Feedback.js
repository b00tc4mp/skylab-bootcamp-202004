import React from 'react'
import './Feedback.sass'


export default function ({message,back}) {
    return <div className="feedback">
        <h2 className="feedback__message">{`${message}`}</h2>
        <button onClick={back}>Aceptar</button>
</div>
}