import React from 'react'

import Feedback from './Feedback'

import {generateWrittenSymptom} from 'client-logic/helpers'
import {deleteSymptom, registerSymptomList, sendSymptomlistByEmail, retrieveSubmittedSymptomsFromStorage } from 'client-logic'
import { useEffect, useState } from 'react'

export default function( { goToDetails, feedback} ) {

  const [symptomList, setSymptomList] = useState(retrieveSubmittedSymptomsFromStorage())
  const [writtenSymptoms, setWrittenSymptoms] = useState(null)
  const [askEmail, setAskEmail] = useState(false)
  const [listFeedback, setListFeedback] = useState(null)
  
  useEffect(()=>{
    try{
      setWrittenSymptoms(symptomList && symptomList.map(symptom =>{
          return generateWrittenSymptom(symptom)
        })
      )
    }catch(error){
      const { message } = error

      setListFeedback({level: "error", message})
    }
  }, [symptomList])

  const copyToClipboard = event=>{
    event.preventDefault()

    event.target.form.symptom.select()
    document.execCommand('copy')
    event.target.focus()
  }

  const deleteSymptomFromStorage = (name)=>{
    try{
      deleteSymptom(name)

      setListFeedback({level: "success", message: "The symptom was successfully deleted"})
      setSymptomList(retrieveSubmittedSymptomsFromStorage())
    }catch(error){
      const { message } = error

      setListFeedback({level: "error", message})
    }
  }

  const submitSymptomList = ()=>{
    try{
      registerSymptomList()
      setAskEmail(true)

    }catch(error){
      const { message } = error

      setListFeedback({level: "error", message})
    }
  }

  const sendEmail = event=>{
    event.preventDefault()
    
    const email = event.target.form.email.value
    try{
      sendSymptomlistByEmail(email)
      setListFeedback({level: "success", message: `We have sent an e-mail to ${email} with the symptom list`})

    }catch(error){
      const { message } = error

      setListFeedback({level: "error", message})
    }
  }

  return <section className="list">
    {feedback && <Feedback message = {feedback.message} level = {feedback.level}/>}
    {listFeedback && <Feedback message = {listFeedback.message} level = {listFeedback.level}/>}
    <h1 className="list__title">Submitted symptoms</h1>
    <ul className="list__list">
      {symptomList?<>
        {symptomList.length?<>{symptomList.map((symptom, i) => <li key={symptom.term.HPO_id}>
          <form className="list__symptom">
            <input className="list__symptom--text" readOnly name="symptom" value={writtenSymptoms?writtenSymptoms[i]:""}/>
            <div className="list__symptom--buttons">
              {document.queryCommandSupported('copy') && <button type="submit" className="list__symptom--item" onClick = {copyToClipboard}>Copy</button>}
              <button className="list__symptom--item" onClick = {event=>{
                event.preventDefault();
                
                goToDetails(symptom.term.name)
                }}>Add details</button>
              <button className="list__symptom--item" onClick = {event=>{
                event.preventDefault()
                
                deleteSymptomFromStorage(symptom.term.name)
                }}>Delete</button>
            </div>
          </form>
        </li>)}{!askEmail && <button className="list__symptom--item" onClick = {submitSymptomList}>Submit Symptom List</button>}
          {askEmail && <>
          <p>Would you like us to send the symptom list to your Email?</p>
            <form className="list__symptom">
              <input className="list__symptom--text" type="email" name = "email" required = {true} placeholder = "Introduce your e-mail here"></input>
              <button type = "submit" className="list__symptom--item" onClick = {sendEmail}>Send</button>
            </form>
          </>}</>: <li className="list__symptom">You haven't submitted any symptoms yet</li>}
      </>: <li className="list__symptom">You haven't submitted any symptoms yet</li>}
    </ul>
  </section>
}




