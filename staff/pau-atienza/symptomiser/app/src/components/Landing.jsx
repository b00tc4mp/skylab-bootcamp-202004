import React from 'react'

import { Link } from 'react-router-dom'

export default function({onSubmit}) {
    return <section className="landing">
        <h1 className="landing__title">Symptomiser</h1>
        <main className="landing__main">
            <form className="landing__main--form" onSubmit = {onSubmit}>
                <input name="query" placeholder="Describe your symptom in a few words" />
            </form>
            <div className="landing__main--nav">
                <Link className="landing__main--link" to="/symptomlist">Your Symptom List</Link>
                <Link className="landing__main--link" to="/about">About the Symptomiser</Link>
            </div>
        </main>
    </section>
}