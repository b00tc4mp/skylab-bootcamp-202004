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

        if (type === 'product-type') type = undefined
        if (sector === 'sector') sector = undefined
        if (ticker === 'ticker') ticker = undefined
        if (market === 'exchange') market = undefined

        try {
            searchProducts(type, sector, ticker, market)
                .then(results => {
                    setError(undefined)
                    setResults(results)
                })
                .catch(({ message }) => {
                    setError(message)
                    setResults(undefined)
                })
        } catch ({ message }) {
            setError(message)
            setResults(undefined)
        }
    }

    return <section className="search">
        <h1 className="search__title"> Search Products </h1>
        <form className="search__form" onSubmit={handleSearch}>
            <section className="search__input">
                <select className="search__select" name="type">
                    <option value="product-type">Prodyct type</option>
                    <option value="future">Future</option>
                    <option value="option">Option</option>
                </select>
                <select className="search__select" name="sector">
                    <option value="sector">Sector</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Banking">Banking</option>
                    <option value="Industrials">Industrials</option>
                    <option value="Consumer">Consumer</option>
                </select>
                <select className="search__select" name="ticker">
                    <option value="ticker">Ticker</option>
                    <option value="ADSG">ADSG</option>
                    <option value="AENA">AENA</option>
                    <option value="BBVA">BBVA</option>
                    <option value="DBKI">DBKI</option>
                    <option value="IBE">IBE</option>
                    <option value="ITX">ITX</option>
                    <option value="HNK">HNK</option>
                    <option value="miniIBEX">miniIBEX</option>
                </select>
                <select className="search__select" name="market">
                    <option value="exchange">Exchange</option>
                    <option value="MEFF">MEFF</option>
                    <option value="EUREX">EUREX</option>
                </select>
            </section>
            <button className="search__button">Search</button>
        </form>
        {results && <Results results={results} handleGoToDetails={handleGoToDetails} />}
        {error && <Feedback message={error} />}
    </section>
}

export default Search

