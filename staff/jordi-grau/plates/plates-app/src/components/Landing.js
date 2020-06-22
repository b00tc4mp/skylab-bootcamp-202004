import React from 'react'
import './Landing'

import { link } from 'react-router-dom' 

export default function ({onGoToRegister, onGoToLogin}) {
    return <section className="landing">
        <a href="" onClick={onGoToRegister}>Register</a> or <a href="" onClick={onGoToLogin}>Login</a>
    </section>
}
