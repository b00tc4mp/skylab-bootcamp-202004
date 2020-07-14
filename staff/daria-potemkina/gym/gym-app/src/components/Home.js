import React, { useState, useEffect } from 'react'
import { retrieveFutures, retrieveOptions } from 'gym-client-logic'
import Futures from './Futures'
import Options from './Options'
import Spinner from './Spinner'
import './Home.sass'
import Feedback from './Feedback'

function Home ({handleGoToDetails, handleShowUnderlyingPrices}) {
    const [options, setOptions] = useState();
    const [futures, setFutures] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
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
                .then(options => {
                    setOptions(options)
                setLoading(false)})
            } catch ({message}) {
                setError(message)
            }

    }, [])

        return <section className="home">
            {loading && <Spinner /> }
            {futures && <Futures futures={futures} handleGoToDetails = {handleGoToDetails} handleShowUnderlyingPrices={handleShowUnderlyingPrices}/>}
            {options && <Options options={options} handleGoToDetails = {handleGoToDetails} handleShowUnderlyingPrices={handleShowUnderlyingPrices}/>}
            {error && !loading && <Feedback message={error} level="error" />}
        </section>
}

export default Home