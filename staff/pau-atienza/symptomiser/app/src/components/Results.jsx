import React from 'react'
// import { Link } from 'react-router-dom'

export default function( { results, onClick, clickedSymptom, goToSymptom } ) {

    return <section className="results">
    <p className = 'results__list--title'>Proposed terms:</p>
    <ul className="results__list">
      {results?results.prediction.map(symptom => <li key={symptom.id}>
        <button class='results__list--item' onClick = {()=>{onClick(symptom.id)}}>{symptom.name}</button>
      </li>): <p className="results__list--title">The search yielded no results, it's likely that there was a problem</p>}
    </ul>
    {clickedSymptom && 
    <main className='results__main'>
        <div className = 'results__main--name'>{clickedSymptom.name}</div>
        <div className='results__main--definition'>{clickedSymptom.description}</div>
        <button class='results__list--item' onClick = {goToSymptom}>Navigate from this term</button>
    </main>}
  </section>
}