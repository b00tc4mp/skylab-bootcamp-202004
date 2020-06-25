import React from 'react'

import { Link } from 'react-router-dom'

import Feedback from './Feedback'

import search from '../images/search-icon.png'

export default function({onSubmit, feedback}) {
    return <section className="landing">
        <h1 className="landing__title">Symptomiser</h1>
        <main className="landing__main">
            <form className="landing__main--form" onSubmit = {onSubmit}>
                <input className="landing__main--input" name="query" required minLength = "2" spellCheck = 'false' placeholder="Describe your symptom in a few words" />
                <button className="landing__main--button" type = "submit">
                    <img alt = "" className="landing__main--image" src = {search}></img>
                </button>
            </form>
            <div className="landing__main--nav">
                <Link className="landing__main--link" to="/symptomlist">Your Symptom List</Link>
                <Link className="landing__main--link" to="/about">About the Symptomiser</Link>
            </div>
        </main>
        {feedback && <Feedback message = {feedback.message} level = {feedback.level?feedback.level:null}/>}
    </section>
}