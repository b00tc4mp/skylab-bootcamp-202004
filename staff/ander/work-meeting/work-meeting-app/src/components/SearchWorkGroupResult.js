import React, { useState }  from 'react'
import {addPetition} from 'work-meeting-client-logic'

export default function ({ _token, results}) {
    const [token , setToken] = useState(_token)
  
    function handleSendPetition(id){
        try{
        addPetition(id,token)
            .then(()=>{console.log('done')})
            .catch((error)=>{if(error) throw error} )
        }catch(error){
            if(error) throw error
        }
       
    }
    
    return <section className="results">
     
        {
                results &&  <ul className="resultsWG__container">
              {results.map(({ _id, name}) =>
                    <li className="resultsWG__item" key={name}>
                        <a>{name}</a><button onClick={()=>{handleSendPetition(_id)}}>Send Petition</button></li>)}
            </ul>
        
        }
    </section>
}