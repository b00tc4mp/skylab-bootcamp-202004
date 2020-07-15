import React, { useState, useEffect } from 'react'
import './Home.sass'
import { retrieveUser } from 'misc-client-logic'

export default function ({token}) {
    const [name, setName] = useState()
    const [error, setError] = useState()
    
    useEffect(() => {
        try{
            return retrieveUser(token)
            .then(user => setName(user.name))
            .catch(error => setError(error))
        }catch(error){
            setError(error)
        }
    })
    return <section className="home">
        <h1>Welcome {name} !</h1>

    </section>
}