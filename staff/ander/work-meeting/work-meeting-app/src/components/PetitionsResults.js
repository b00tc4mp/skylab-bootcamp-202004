import React, { useState }  from 'react'
import { updatePetition} from 'work-meeting-client-logic'
export default function ({petitions, workGroupId}) {
  
    function handleAcceptPetition(userId, petitionId, workGRoupId, status){
        try{
            debugger
            updatePetition(userId, workGRoupId, petitionId , status)
        }catch(error){
            if(error) throw error
        }
       
    }
    
    return <section className="petitions">
     
        {
            petitions &&  <ul className="petitions__container">
              {petitions.map(({ _id, user}) =>
                    <li className="petitions__item" key={user.name}>
                        <a>{user.name + "  " +user.surname}</a><button onClick={()=>handleAcceptPetition(user._id, _id,workGroupId,'accepted')}>Accept</button><button>Deny</button></li>)}
            </ul>
        
        }
    </section>
}