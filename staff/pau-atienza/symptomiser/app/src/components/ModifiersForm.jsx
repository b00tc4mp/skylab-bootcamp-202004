import React from 'react'
import arrow from '../images/up-arrow.svg'
import {useEffect, useState} from 'react'

import Feedback from './Feedback'

import { retrieveTermsById, addModifierToSymptom, deleteModifierFromSymptom, deleteCommentsFromSymptom, retrieveSymptomToModifyFromStorage } from 'client-logic'
import {generateWrittenSymptom} from 'client-logic/helpers'

export default function( {  saveModifiedSymptom, feedback } ) {

    const [modifier, setModifier] = useState(null)
    const [writtenSymptom, setWrittenSymptom] = useState(generateWrittenSymptom(retrieveSymptomToModifyFromStorage()))
    const [showConfidence, setShowConfidence] = useState(null)
    const [symptomToModify, setSymptomToModify] = useState(retrieveSymptomToModifyFromStorage())
    const [deleteMode, setDeleteMode] = useState(false)
    const [modifiersFeedback, setModifiersFeedback] = useState(null)


    useEffect(()=>{
        try{
            updateModifier("HP:0012823")
        }catch(error){
            const { message } = error
    
            setModifiersFeedback({level: "error", message})
        }
    }, [symptomToModify])

    const updateModifier = async (id) =>{
        try{
            setModifier(await retrieveTermsById(id))
        }catch(error){
          const { message } = error
    
          setModifiersFeedback({level: "error", message})
        }
    }

    const submitModifier = (confidenceLevel)=>{
        try{
            const modifiedSymptom = addModifierToSymptom(confidenceLevel, modifier)

            setSymptomToModify(modifiedSymptom)
            setShowConfidence(false)
            setWrittenSymptom(generateWrittenSymptom(modifiedSymptom))
            setModifiersFeedback({ level: "success", message: "The modifier was added. Don't forget to save the changes before you continue."})
        }catch(error){
          const { message } = error
    
          setModifiersFeedback({level: "error", message})
        }
    }

    const toggleAllowDeletion = event=>{
        event.preventDefault()

        setModifiersFeedback(null)

        setDeleteMode(!deleteMode)
        setWrittenSymptom(generateWrittenSymptom(symptomToModify))
    }

    const deleteModifier = name=>{
        try{
            const modifiedSymptom = deleteModifierFromSymptom(name)
    
            setSymptomToModify(modifiedSymptom)
            setWrittenSymptom(generateWrittenSymptom(modifiedSymptom))
            setModifiersFeedback({ level: "success", message: "The modifier was deleted. Don't forget to save the changes in the details section before you continue."})

        }catch(error){
          const { message } = error
    
          setModifiersFeedback({level: "error", message})
        }
    }

    const deleteComments = ()=>{
        try{
            const modifiedSymptom = deleteCommentsFromSymptom()
    
            setSymptomToModify(modifiedSymptom)
            setWrittenSymptom(generateWrittenSymptom(modifiedSymptom))
            setModifiersFeedback({ level: "success", message: "The comments were deleted. Don't forget to save the changes in the details section before you continue."})
        }catch(error){
          const { message } = error
    
          setModifiersFeedback({level: "error", message})
        }
    }

    return !deleteMode?<section className="form">
        {feedback && <Feedback message = {feedback.message} level = {feedback.level}/>}
        {modifiersFeedback && <Feedback message = {modifiersFeedback.message} level = {modifiersFeedback.level}/>}
        {symptomToModify?<form className="form__main">
            <div className="form__element"> 
                <h2 className="form__element--name">Symptom Information</h2>
                <textarea readOnly cols = "10" rows = "20" wrap = "soft" className="form__element--input" name="symptom" spellCheck = 'false' value={writtenSymptom}/>
            </div>
            <div className="form__element"> 
                <textarea cols = "10" rows = "20" wrap = "soft" className="form__element--input" spellCheck = 'false' type = "text" name="comment" placeholder = "Write any additional comments here" defaultValue = {symptomToModify.comments?symptomToModify.comments:''}/>
            </div>
            <div className = "form__element">
                <button className="symptom__term" onClick = {toggleAllowDeletion}>Delete comments or modifiers</button>
                <button type = 'submit' onClick = {event =>saveModifiedSymptom(event)}>Save changes</button>
            </div>
        </form>: <p>You didn't select a symptom to add details to.</p>}

        <section className="symptom">
            {modifier && <>{modifier.higher.length && modifier.higher[0].name !== 'All'?<header className="symptom__top">
                <ul className="symptom__bottom--terms">
                    {modifier.higher.map(modifier =>
                    <li key = {modifier.HPO_id}>
                        <button onClick = {()=>{updateModifier(modifier.HPO_id)}} className="symptom__term">{modifier.name}</button>
                    </li>)}
                </ul>
                <img className="symptom__top--arrow" alt = "" src={arrow} />
                <p>Less specific terms</p>
            </header>:<></>}
            {modifier.term.HPO_id !== "HP:0012823"  && <main className="symptom__main">
                <div className="symptom__main--identifiers">
                        <div className="symptom__main--name">{modifier.term.name}</div>
                </div>
                <div className="symptom__main--description">{modifier.term.def}</div>
                <div className="symptom__main--links">
                    {!showConfidence && !modifier.lower.length && <button  className="symptom__term" onClick = {()=>{setShowConfidence(true)}}>Add modifier</button>}
                    {showConfidence && <div>
                        <p>Degree of confidence:</p>
                        <div>
                        <button  className="symptom__term" onClick = {()=>{submitModifier('low')}}>Low</button>
                        <button  className="symptom__term" onClick = {()=>{submitModifier('medium')}}>Medium</button>
                        <button  className="symptom__term" onClick = {()=>{submitModifier('high')}}>High</button>
                        </div>
                    </div>}
                </div>
            </main>}
            {modifier.term.HPO_id === "HP:0012823"  && <main className="symptom__initialmain">
                <div className="symptom__main--identifiers">
                <div className="symptom__main--name">Adding clinical modifiers</div>
                </div>
                <div className="symptom__main--description">
                    Use the buttons below to find the terms that adjust to any of the specifics of your symptom (such as position or severity)
                </div>
            </main>}
            {modifier.lower.length? 
            <footer className="symptom__bottom">
                {modifier.term.HPO_id !== "HP:0012823"  && <>
                    <p>More specific terms: check if any of these fit with your symptom</p>
                    <img alt = "" className="symptom__bottom--arrow" src={arrow} />
                </>}
                <ul className="symptom__bottom--terms">
                {modifier.lower.map(modifier =>
                    <li key = {modifier.HPO_id}>
                        <button onClick = {()=>{updateModifier(modifier.HPO_id)}} className="symptom__term">{modifier.name}</button>
                    </li>)}
                </ul></footer>: <></>}
            </>}
        </section>
    </section>
    :
    <section className="form">
        {feedback && <Feedback message = {feedback.message} level = {feedback.level}/>}
        {modifiersFeedback && <Feedback message = {modifiersFeedback.message} level = {modifiersFeedback.level}/>}
        <div className = "form__symptom">
            <p>Term: {symptomToModify.term.HPO_id}: {symptomToModify.term.name}</p>
        </div >
        <ul className = "form__modifiers">
            {symptomToModify.modifiers && symptomToModify.modifiers.length?<>
                <p>Modifiers:</p>
                {symptomToModify.modifiers.map(modifier=><li key = {modifier.HPO_id}>
                    <p>{modifier.HPO_id}: {modifier.name}</p>
                    <button className="symptom__term" onClick = {()=>deleteModifier(modifier.name)}>Delete</button>
                </li>)}
            </>: ""}
        </ul>
        {symptomToModify.comments && <div className = "form__comments">
            <p>Comments:</p> <p>{symptomToModify.comments}</p>
            <button className="symptom__term" onClick = {deleteComments}>Delete</button>
        </div>}
        <button className="symptom__term" onClick = {toggleAllowDeletion}>Back to Symptom Details</button>
    </section>
}