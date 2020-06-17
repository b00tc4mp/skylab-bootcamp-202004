import React, { useState } from 'react'
import { searchProducts } from 'gym-client-logic'
import './Search.sass'
import Results from './Results'

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
                })
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }

    return <section className="search">
        <h1 className="search__title"> Search </h1>
        <form onSubmit={handleSearch}>
            <label for='type'>Product Type</label>
            <select name="type">
                <option value="all">All</option>
                <option value="future">Future</option>
                <option value="option">Option</option>
            </select>
            <label for='sector'>Sector</label>
            <select name="sector">
                <option value="all">All</option>
                <option value="Utilities">Utility</option>
                <option value="Banking">Banking</option>
                <option value="Industrials">Industrials</option>
                <option value="Consumer">Consumer</option>
            </select>
            <label for='ticker'>Ticker</label>
            <select name="ticker">
                <option value="all">All</option>
                <option value="ITX">ITX</option>
                <option value="AENA">AENA</option>
                <option value="BBVA">BBVA</option>
                <option value="IBE">IBE</option>
                <option value="miniIBEX">miniIBEX</option>
            </select>
            <label for='market'>Exchange</label>
            <select name="market">
                <option value="all">All</option>
                <option value="MEFF">MEFF</option>
                <option value="EUREX">EUREX</option>
            </select>
            <button>Search</button>
        </form>
        {results && <Results results={results} handleGoToDetails={handleGoToDetails} />}
    </section>
}

export default Search

