import React, {useState} from 'react'
import arrow from '../images/up-arrow.svg'

export default function( { symptom, goToSymptom, submitSymptom } ) {

  const [showConfidence, setShowConfidence] = useState(false)

  return <section className="symptom">
    {symptom && <>{symptom.higher && symptom.higher.length && symptom.higher[0].name !== 'All'?<header className="symptom__top">
        <ul className="symptom__bottom--terms">
            {symptom.higher.map(symptom =>
            <li key = {symptom.HPO_id}>
                <button onClick = {()=>{goToSymptom(symptom.HPO_id)}} className="symptom__term">{symptom.name}</button>
            </li>)}
        </ul>
        <img className="symptom__top--arrow" alt = "" src={arrow} />
        <p>Less specific terms</p>
    </header>:<></>}
    <main className="symptom__main">
      <div className="symptom__main--identifiers">
            <div className="symptom__main--name">{symptom.term.name}</div>
      </div>
      <div className="symptom__main--description">{symptom.term.def}</div>
      <div className="symptom__main--links">
        {showConfidence === false && <button  className="symptom__term" onClick = {()=>{setShowConfidence(true)}}>Add to symptom list</button>}
        {showConfidence === true && <div>
            <p>Degree of confidence:</p>
            <div>
              <button  className="symptom__term" onClick = {()=>{submitSymptom('low')}}>Low</button>
              <button  className="symptom__term" onClick = {()=>{submitSymptom('medium')}}>Medium</button>
              <button  className="symptom__term" onClick = {()=>{submitSymptom('high')}}>High</button>
            </div>
          </div>}
      </div>
    </main>
      {symptom.lower && symptom.lower.length? 
       <footer className="symptom__bottom">
        <p>More specific terms: check if any of these fit with your symptom</p>
        <img className="symptom__bottom--arrow" alt = "" src={arrow} />
        <ul className="symptom__bottom--terms">
          {symptom.lower.map(symptom =>
            <li key = {symptom.HPO_id}>
                <button onClick = {()=>{goToSymptom(symptom.HPO_id)}} className="symptom__term">{symptom.name}</button>
            </li>)}
        </ul></footer>: <></>}
    </>}
  </section>
}