import React from 'react'

import Feedback from './Feedback'

export default function( { feedback, results, onClick, clickedSymptom, goToSymptom } ) {

    return <section className="results">
    {feedback && <Feedback message = {feedback.message} level = {feedback.level?feedback.level:null}/>}
    <p className = 'results__list--title'>Proposed terms</p>
    <ul className="results__list">
      {results?results.prediction.map(symptom => <li key={symptom.predictionCode}>
        <button className='results__list--item' onClick = {()=>{onClick(symptom.predictionCode)}}>{symptom.predictionName}</button>
      </li>): <li className="results__list--title">The search yielded no results, there was likely a problem.</li>}
    </ul>
    {clickedSymptom && 
    <main className='results__main'>
        <div className = 'results__main--name'>{clickedSymptom.term.name}</div>
        <div className='results__main--definition'>{clickedSymptom.term.def}</div>
        <button className='results__list--item' onClick = {goToSymptom}>Navigate from this term</button>
    </main>}
  </section>
}