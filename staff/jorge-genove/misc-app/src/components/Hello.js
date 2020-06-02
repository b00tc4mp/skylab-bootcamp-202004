import React from 'react'
import './Hello.sass'
import { salute } from 'misc-client-logic'

export default function ({ name }) {
    const salutation = salute(name)

    return <p className="hello">{salutation}</p>
}