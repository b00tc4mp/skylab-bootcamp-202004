import React from 'react'
import arrow from '../images/up-arrow.svg'
import { retrieveTermsById } from 'client-logic'
import {useEffect, useState} from 'react'

export default function( { symptom, goToSymptom, submitSymptom } ) {

    const [modifier, setModifier] = useState(null)

    useEffect(() => {
        return (async ()=>{
           
            setModifier(await retrieveTermsById("HP:0012823"))
          })()
      }, []
    )

    return <section className="form">

        <form className="form__main">
            <div className="form__element"> 
                <h2 className="form__element--name">Symptom Information</h2>
                <p>The information in this input can only be modified using the navigation tool below</p>
                <input className="form__element--input" name="symptom" defaultValue={`${symptom.HPO_id}: ${symptom.name}`}/>
            </div>
            <div className="form__element"> 
                <input className="form__element--input" type = "text" name="symptom" placeholder = "Write any additional comments here"/>
            </div>
            <button>Submit</button>
        </form>

        <section className="symptom">
            {modifier && <>{modifier.higher.length && modifier.higher[0].name !== 'All'?<header className="symptom__top">
                <ul className="symptom__bottom--terms">
                    {modifier.higher.map(modifier =>
                    <li key = {modifier.HPO_id}>
                        <button onClick = {()=>{goToSymptom(modifier.HPO_id)}} className="symptom__term">{modifier.name}</button>
                    </li>)}
                </ul>
                <img className="symptom__top--arrow" src={arrow} />
                <p>Less specific terms</p>
            </header>:<></>}
            <main className="symptom__main">
            <div className="symptom__main--identifiers">
                    <div className="symptom__main--name">{modifier.term.name}</div>
            </div>
            <div className="symptom__main--description">{modifier.term.def}</div>
            <div className="symptom__main--links">
                <button  className="symptom__term" onClick = {submitSymptom}>Submit</button>
            </div>
            </main>
            {modifier.lower.length? 
            <footer className="symptom__bottom">
                <p>More specific terms: check if any of these fit with your symptom</p>
                <img className="symptom__bottom--arrow" src={arrow} />
                <ul className="symptom__bottom--terms">
                {modifier.lower.map(modifier =>
                    <li key = {modifier.HPO_id}>
                        <button onClick = {()=>{goToSymptom(modifier.HPO_id)}} className="symptom__term">{modifier.name}</button>
                    </li>)}
                </ul></footer>: <></>}
            </>}
        </section>
    </section>
}




