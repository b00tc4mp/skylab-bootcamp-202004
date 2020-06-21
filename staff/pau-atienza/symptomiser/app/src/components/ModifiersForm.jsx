import React from 'react'
import arrow from '../images/up-arrow.svg'
import { retrieveTermsById } from 'client-logic'
import {useEffect, useState} from 'react'
import {generateWrittenSymptom} from 'client-logic/helpers'

export default function( { symptom, saveModifiedSymptom, onModifierSubmission } ) {

    const [modifier, setModifier] = useState("HP:0012823")
    const [highlightedModifier, setHighlightedModifier] = useState(null)
    const [showConfidence, setShowConfidence] = useState(false)

    useEffect(() => {
        (async ()=>{
            setHighlightedModifier(await retrieveTermsById(modifier))
          })()
      }, [modifier]
    )

    const submitModifier = (confidenceLevel)=>{
        const symptomToModify = JSON.parse(sessionStorage.symptomToModify)

        if(!symptomToModify.modifiers) symptomToModify.modifiers = []
        const {HPO_id, name} = highlightedModifier.term
        const date = new Date().toISOString()
        symptomToModify.modifiers.push({HPO_id, name, confidenceLevel, date})
        sessionStorage.symptomToModify = JSON.stringify(symptomToModify)
        // onModifierSubmission(symptomToModify.term.name)
    }

    return <section className="form">

        {symptom?<form className="form__main">
            <div className="form__element"> 
                <h2 className="form__element--name">Symptom Information</h2>
                <input className="form__element--input" name="symptom" spellCheck = 'false' defaultValue={generateWrittenSymptom(symptom)}/>
            </div>
            <div className="form__element"> 
                <input className="form__element--input" spellCheck = 'false' type = "text" name="comment" placeholder = "Write any additional comments here" defaultValue = {symptom.comments?symptom.comments:''}/>
            </div>
            <button type = 'submit' onClick = {event =>saveModifiedSymptom(event)}>Save changes</button>
        </form>: <p>You didn't select a symptom to add details to.</p>}

        <section className="symptom">
            {highlightedModifier && <>{highlightedModifier.higher.length && highlightedModifier.higher[0].name !== 'All'?<header className="symptom__top">
                <ul className="symptom__bottom--terms">
                    {highlightedModifier.higher.map(modifier =>
                    <li key = {modifier.HPO_id}>
                        <button onClick = {()=>{setModifier(modifier.HPO_id)}} className="symptom__term">{modifier.name}</button>
                    </li>)}
                </ul>
                <img className="symptom__top--arrow" alt = "" src={arrow} />
                <p>Less specific terms</p>
            </header>:<></>}
            <main className="symptom__main">
            <div className="symptom__main--identifiers">
                    <div className="symptom__main--name">{highlightedModifier.term.name}</div>
            </div>
            <div className="symptom__main--description">{highlightedModifier.term.def}</div>
            <div className="symptom__main--links">
            {showConfidence === false && <button  className="symptom__term" onClick = {()=>{setShowConfidence(true)}}>Add modifier</button>}
            {showConfidence === true && <div>
                <p>Degree of confidence:</p>
                <div>
                <button  className="symptom__term" onClick = {()=>{submitModifier('low')}}>Low</button>
                <button  className="symptom__term" onClick = {()=>{submitModifier('medium')}}>Medium</button>
                <button  className="symptom__term" onClick = {()=>{submitModifier('high')}}>High</button>
                </div>
            </div>}
            </div>
            </main>
            {highlightedModifier.lower.length? 
            <footer className="symptom__bottom">
                <p>More specific terms: check if any of these fit with your symptom</p>
                <img alt = "" className="symptom__bottom--arrow" src={arrow} />
                <ul className="symptom__bottom--terms">
                {highlightedModifier.lower.map(modifier =>
                    <li key = {modifier.HPO_id}>
                        <button onClick = {()=>{setModifier(modifier.HPO_id)}} className="symptom__term">{modifier.name}</button>
                    </li>)}
                </ul></footer>: <></>}
            </>}
        </section>
    </section>
}




