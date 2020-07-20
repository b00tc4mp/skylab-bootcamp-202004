import React, { useState, useEffect } from 'react'
import { createWorkGroup, retrieveUser, changeWorkGroup} from 'work-meeting-client-logic'

export default function ({workGroups, token, onWorkGroup, onWorkGroupPref}) {  

    const handleChangeWorkGroup = (_id,name) => { 
        
        (async ()=>{
            debugger
            await changeWorkGroup(token,_id)
            onWorkGroupPref(name)
                     
            })()
    }
    const handleSubmitCreate = (event) => {
        event.preventDefault()
        let { name } = event.target
        name = name.value
        try {
            retrieveUser(token)
                .then(body => {
                    const { id } = body
                    return id
                })
                .catch(error => { if (error) throw error })
                .then(id => createWorkGroup(name, id))
                .catch(error => { if (error) throw error })

        } catch (error) {
            if (error) throw error
        }
            debugger
            onWorkGroup([name])
    }

    return <section className="workGroup">
         <h1>Work Groups</h1> 
         
        {
            workGroups &&  <ul className="workGroup__container">
              {workGroups.map(({ name, _id}) =>
                    <li className="workGroup__item" key={name}>
                        <a onClick={(event)=>{handleChangeWorkGroup(_id,name)}}>{name}</a></li>)}
            </ul>
        }     
            <form onSubmit={handleSubmitCreate}>
            <label>Create new work group:</label>
            <input type="text" name="name" placeholder="" required pattern="[A-Za-z]{1,20}" />
            <button>Create</button>
        </form> 
        
        
        
    </section>
}