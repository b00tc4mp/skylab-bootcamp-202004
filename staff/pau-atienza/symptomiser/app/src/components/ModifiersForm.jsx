import React from 'react'
import arrow from '../images/up-arrow.svg'
import { retrieveTermsById } from 'client-logic'
import {useEffect, useState} from 'react'

export default function( { symptom, createWrittenSymptom, saveModifiedSymptom } ) {

    const [modifier, setModifier] = useState("HP:0012823")
    const [highlightedModifier, setHighlightedModifier] = useState(null)

    useEffect(() => {
        (async ()=>{
            setHighlightedModifier(await retrieveTermsById(modifier))
          })()
      }, [modifier]
    )

    const submitModifier = ()=>{
        const symptomToModify = JSON.parse(sessionStorage.symptomToModify)

        if(!symptomToModify.modifiers) symptomToModify.modifiers = []
        const {HPO_id, name} = highlightedModifier.term
        symptomToModify.modifiers.push({HPO_id, name})
        sessionStorage.symptomToModify = JSON.stringify(symptomToModify)
    }

    return <section className="form">

        {symptom?<form className="form__main">
            <div className="form__element"> 
                <h2 className="form__element--name">Symptom Information</h2>
                <input className="form__element--input" name="symptom" spellcheck = 'false' defaultValue={createWrittenSymptom(symptom)}/>
            </div>
            <div className="form__element"> 
                <input className="form__element--input" spellcheck = 'false' type = "text" name="comment" placeholder = "Write any additional comments here" defaultValue = {symptom.comments?symptom.comments:''}/>
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
                <img className="symptom__top--arrow" src={arrow} />
                <p>Less specific terms</p>
            </header>:<></>}
            <main className="symptom__main">
            <div className="symptom__main--identifiers">
                    <div className="symptom__main--name">{highlightedModifier.term.name}</div>
            </div>
            <div className="symptom__main--description">{highlightedModifier.term.def}</div>
            <div className="symptom__main--links">
                <button  className="symptom__term" onClick = {submitModifier}>Submit</button>
            </div>
            </main>
            {highlightedModifier.lower.length? 
            <footer className="symptom__bottom">
                <p>More specific terms: check if any of these fit with your symptom</p>
                <img className="symptom__bottom--arrow" src={arrow} />
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




