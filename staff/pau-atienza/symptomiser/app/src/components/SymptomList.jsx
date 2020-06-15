import React from 'react'
// import { Link } from 'react-router-dom'

export default function( { symptomList } ) {

    return <section className="list">
    <h1 className="list__title">Submitted symptoms</h1>
    <ul className="list__list">
      {symptomList?symptomList.map(symptom => <li key={symptom.HBO_id}>
        <form className="list__symptom">
          <input className="list__symptom--text" name="symptom" defaultValue={`${symptom.HBO_id}: ${symptom.name}`}/>
        <div className="list__symptom--buttons">
          <a href className="list__symptom--item">Copy</a>
          <a href className="list__symptom--item">Add details</a>
        </div>
      </form>       
      </li>): <li className="list__symptom">You haven't submitted any symptoms yet</li>}
    </ul>
  </section>
}




