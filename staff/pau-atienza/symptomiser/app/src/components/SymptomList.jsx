import React from 'react'

import {generateWrittenSymptom} from 'client-logic/helpers'
import {deleteSymptom, registerSymptomList} from 'client-logic'

export default function( { symptomList, goToDetails, onDelete} ) {

  const copyToClipboard = event=>{
    event.preventDefault()
    event.target.form.symptom.select()
    document.execCommand('copy')
    event.target.focus()
  }

  const deleteSymptomFromStorage = (name)=>{
    deleteSymptom(name)
    onDelete()
  }

  return <section className="list">
    <h1 className="list__title">Submitted symptoms</h1>
    <ul className="list__list">
      {symptomList && symptomList.length?symptomList.map(symptom => <li key={symptom.term.HPO_id}>
        <form className="list__symptom">
          <input className="list__symptom--text" readOnly name="symptom" value={generateWrittenSymptom(symptom)}/>
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
      <button className="list__symptom--item" onClick = {registerSymptomList}>Submit Symptom List</button>       
      </li>): <li className="list__symptom">You haven't submitted any symptoms yet</li>}
    </ul>
  </section>
}




