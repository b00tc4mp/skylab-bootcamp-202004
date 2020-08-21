import React, { useState }  from 'react'
import {context,addPetition} from 'work-meeting-client-logic'
import Feedback from './Feedback'
import './SearchWorkGroupResult.sass'
export default function ({results}) {
    const {token:_token} = context.storage
    const [token , setToken] = useState(_token)
    const [error, setError] = useState()
    const [succes, setSucces] = useState()
  
    function handleSendPetition(id){
        try{
            debugger
        addPetition(id,token)
            .then(()=>{setSucces("petition sent correctly")})
            .catch((error)=>{ setError(error.message)} )
        }catch(error){
            if(error) throw error
        }
       
    }
    
    return <section className="resultsWG">
     
        {
                results &&  <ul className="resultsWG__container">
              {results.map(({ id, name}) =>
                    <li className="resultsWG__item" key={name}>
                        <a>{name}</a><button onClick={()=>{handleSendPetition(id)}}>Send Petition</button></li>)}
            </ul>
        }
        {error && <Feedback message={error} level="error" />}
        {succes && <Feedback message={succes} level="succes" />}
    </section>
}