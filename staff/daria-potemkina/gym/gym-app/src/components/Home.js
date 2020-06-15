import React, { useState, useEffect } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { retrieveUser, retrieveFutures, retrieveOptions } from 'gym-client-logic'
import Futures from './Futures'
import Options from './Options'
import './NavBar.sass'
import './Home.sass'

function Home ({handleGoToDetails, handleShowUnderlyingPrices, onLogout, token}) {
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
            <nav className="nav-bar">
                <input alt="button" type="image" src="/logo-mini.png" className="nav-bar__button"></input>
                <ul className="nav-bar__list nav-bar__list--open">
                    <li><a href="/"> Home</a></li>
                    <li><a href="/">Portfolio</a></li>
                    <li><a href="/">Notifications</a></li>
                    <li><a href="/">Account</a></li>
                    <li><a href="/">Settings</a></li>
                    <li><a href="/" onClick={onLogout}>Logout</a> </li>
                </ul>
                <button className="nav-bar__button">|||</button>
            </nav>

            <h1>Welcome, {name}!</h1>
            <h1>Futures</h1>
            {futures && <Futures futures={futures} handleGoToDetails = {handleGoToDetails} handleShowUnderlyingPrices={handleShowUnderlyingPrices}/>}
            <h1>Options</h1>
            {options && <Options options={options} />}
        </section>
    
}

export default Home