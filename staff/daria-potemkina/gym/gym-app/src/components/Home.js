import React, { useState, useEffect } from 'react'
import { retrieveUser, retrieveFutures, retrieveOptions } from 'gym-client-logic'
import Futures from './Futures'
import Options from './Options'
import Search from './Search'
import './Home.sass'

function Home ({handleGoToDetails, handleShowUnderlyingPrices, token}) {
    const [options, setOptions] = useState();
    const [futures, setFutures] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        try {
            retrieveUser(token)
                .then(({name}) => setName(name))
        } catch ({message}) {
            setError(message)
        }
        
    }, [])
    useEffect(() => {
        try {
            retrieveFutures()
                .then(futures => setFutures(futures))
            } catch ({message}) {
                setError(message)
            }

    }, [])
    useEffect(() => {
        try {
            retrieveOptions()
                .then(options => setOptions(options))
            } catch ({message}) {
                setError(message)
            }

    }, [])

        return <section className="home">
            <h1>Futures</h1>
            {futures && <Futures token={token} futures={futures} handleGoToDetails = {handleGoToDetails} handleShowUnderlyingPrices={handleShowUnderlyingPrices}/>}
            <h1>Options</h1>
            {options && <Options token={token} options={options} handleGoToDetails = {handleGoToDetails} handleShowUnderlyingPrices={handleShowUnderlyingPrices}/>}
        </section>
}

export default Home