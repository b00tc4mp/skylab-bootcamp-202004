import React, { useEffect, useState } from 'react';
import { retrieveUser } from 'misc-client-logic'
import Feedback from './Feedback'
import './Home.sass'

export default function () {
    const [view, setView] = useState('home')
    const [token, setToken] = useState()

    useEffect(() => {

        retrieveUser(token)
            .then((user) => {

            })
    },[])

    return <section className="home">
        <h1>Home</h1> 
        {/* {view === 'home' && <Home />} */}
        {/* {view === 'products' && <Products  />}
        {view === 'user' && <User />} */}
    
        </section>
}