import React, { useState, useEffect } from 'react'
import { createWorkGroup, retrieveUser, retrieveWorkGroup , searchWorkGroup, changeWorkGroup, retrieveWorkGroupPref,retrievePetitionAll} from 'work-meeting-client-logic'
import SearchWorkGroupResults from './SearchWorkGroupResult' 
import PetitionsResults from './PetitionsResults'
export default function ({ _token,  workGroupsList, myWorkGroup }) {
    
    
    
    const [workGroupResults, setworkGroupResults] = useState()
    const [petitionsStatus, setpetitions] = useState()

/*     useEffect(async() => {
        const result= await retrieveWorkGroupPref(_token)
        if(result){
            try {
                const {name,_id} = await retrieveWorkGroupPref(_token)
                setWorkGroupPref(name)
                setWorkGroupPrefId(_id) 
                const petitions =await retrievePetitionAll(_id, _token)
                setpetitions(petitions)
                const workGroups = await retrieveWorkGroup(_token)
                setWorkGroupsList(workGroups) 
                
             } catch (error) {
                if (error) throw error
              }
        }else{ return 
        
        }
    }, []) */
/* 
    const handleSubmitCreate = (event) => {
        event.preventDefault()
        let { name } = event.target
        name = name.value
        try {
            retrieveUser(_token)
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

    }

  */
    function handleChangeWorkGroup(id,name){
        (async()=>{
        await changeWorkGroup(_token,id)
        myWorkGroup(name)
                 
        })()
    } 
    
    /* 
    esto es para la segunda parte
    function handleSubmitSearch(event){
        event.preventDefault()
        let {query} = event.target
        query=query.value
        try{
                searchWorkGroup(query)
                    .then((results)=>setworkGroupResults(results))
        }catch(error){
            if(error) throw error

        }

    } */
    return <section className="workGroup">
        <h1>Work Groups</h1>
        {
                workGroupsList &&  <ul className="workGroup__container">
              {workGroupsList.map(({ name, _id}) =>
                    <li className="workGroup__item" key={name}>
                        <a onClick={(event)=>{handleChangeWorkGroup(event,_id,name)}}>{name}</a></li>)}
            </ul>
        
        }
            {/* <form onSubmit={handleSubmitCreate}>
                <label>Create new work group:</label>
                <input type="text" name="name" placeholder="" required pattern="[A-Za-z]{1,20}" />
                <button>Create</button>
            </form> */}
            {/* <form onSubmit= {handleSubmitSearch}>
                <label>Search work group:</label>
                <input type="text" name="query" placeholder="" required pattern="[A-Za-z]{1,20}" />
                <button>Search</button>
            </form> */}
            {workGroupResults && <SearchWorkGroupResults results={workGroupResults} _token={_token}/>}
            {petitionsStatus && < PetitionsResults petitions={petitionsStatus} /* workGroupId={workGroupPrefId} *//>}
    </section>
}