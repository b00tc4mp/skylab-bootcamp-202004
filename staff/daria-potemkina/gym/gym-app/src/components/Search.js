import React, { useState } from 'react'
import { searchProducts } from 'gym-client-logic'
import './Search.sass'
import Results from './Results'
import Feedback from './Feedback'

function Search({ handleGoToDetails }) {
    const [results, setResults] = useState()
    const [error, setError] = useState()

    const handleSearch = event => {
        event.preventDefault()

        let { type, ticker, sector, market } = event.target

        type = type.value
        sector = sector.value
        ticker = ticker.value
        market = market.value

        if (type === 'all') type = undefined
        if (sector === 'all') sector = undefined
        if (ticker === 'all') ticker = undefined
        if (market === 'all') market = undefined

        try {
            searchProducts(type, sector, ticker, market)
                .then(results => {
                    setResults(results)
                    if (!results.length) setResults('no results')
                })
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
            setResults(undefined)
        }
    }

    return <section className="search">
        <h1 className="search__title"> Search </h1>
        <form onSubmit={handleSearch}>
            <section className="search__input">
                <label className="search__label" for='type'>Product Type</label>
                <select className="search__select" name="type">
                    <option value="all">All</option>
                    <option value="future">Future</option>
                    <option value="option">Option</option>
                </select>
                <label className="search__label" for='sector'>Sector</label>
                <select className="search__select" name="sector">
                    <option value="all">All</option>
                    <option value="Utilities">Utility</option>
                    <option value="Banking">Banking</option>
                    <option value="Industrials">Industrials</option>
                    <option value="Consumer">Consumer</option>
                </select>
                <label className="search__label" for='ticker'>Ticker</label>
                <select className="search__select" name="ticker">
                    <option value="all">All</option>
                    <option value="ITX">ITX</option>
                    <option value="AENA">AENA</option>
                    <option value="BBVA">BBVA</option>
                    <option value="IBE">IBE</option>
                    <option value="miniIBEX">miniIBEX</option>
                </select>
                <label className="search__label" for='market'>Exchange</label>
                <select className="search__select" name="market">
                    <option value="all">All</option>
                    <option value="MEFF">MEFF</option>
                    <option value="EUREX">EUREX</option>
                </select>
            </section>
            <button className="search__button">Search</button>
        </form>
        {results && <Results results={results} handleGoToDetails={handleGoToDetails} />}
        {error && <Feedback message={error} level="error" />}
    </section>
}

export default Search

