import React from 'react'

export default function( { symptomList, goToDetails } ) {

  const copyToClipboard = event=>{
    event.preventDefault()
    event.target.form.symptom.select()
    document.execCommand('copy')
    event.target.focus()
  }

  return <section className="list">
    <h1 className="list__title">Submitted symptoms</h1>
    <ul className="list__list">
      {symptomList && symptomList.length?symptomList.map(symptom => <li key={symptom.HPO_id}>
        <form className="list__symptom">
          <input className="list__symptom--text" readOnly name="symptom" value={`${symptom.HPO_id}: ${symptom.name}`}/>
        <div className="list__symptom--buttons">
          {document.queryCommandSupported('copy') && <button type="submit" className="list__symptom--item" onClick = {copyToClipboard}>Copy</button>}
          <button className="list__symptom--item" onClick = {event=>{
            event.preventDefault();
            
            goToDetails(symptom.name)
            }}>Add details</button>
        </div>
      </form>       
      </li>): <li className="list__symptom">You haven't submitted any symptoms yet</li>}
    </ul>
  </section>
}




