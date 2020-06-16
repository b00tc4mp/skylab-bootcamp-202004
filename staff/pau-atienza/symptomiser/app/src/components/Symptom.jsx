import React from 'react'
import arrow from '../images/up-arrow.svg'

export default function( { symptom, goToSymptom, submitSymptom } ) {


  return <section className="symptom">
    {symptom && <>{symptom.higher && symptom.higher.length && symptom.higher[0].name !== 'All'?<header className="symptom__top">
        <ul className="symptom__bottom--terms">
            {symptom.higher.map(symptom =>
            <li key = {symptom.HPO_id}>
                <button onClick = {()=>{goToSymptom(symptom.HPO_id)}} className="symptom__term">{symptom.name}</button>
            </li>)}
        </ul>
        <img className="symptom__top--arrow" src={arrow} />
        <p>Less specific terms</p>
    </header>:<></>}
    <main className="symptom__main">
      <div className="symptom__main--identifiers">
            <div className="symptom__main--name">{symptom.term.name}</div>
      </div>
      <div className="symptom__main--description">{symptom.term.def}</div>
      <div className="symptom__main--links">
        <button  className="symptom__term" onClick = {submitSymptom}>Submit</button>
      </div>
    </main>
      {symptom.lower && symptom.lower.length? 
       <footer className="symptom__bottom">
        <p>More specific terms: check if any of these fit with your symptom</p>
        <img className="symptom__bottom--arrow" src={arrow} />
        <ul className="symptom__bottom--terms">
          {symptom.lower.map(symptom =>
            <li key = {symptom.HPO_id}>
                <button onClick = {()=>{goToSymptom(symptom.HPO_id)}} className="symptom__term">{symptom.name}</button>
            </li>)}
        </ul></footer>: <></>}
    </>}
  </section>
}