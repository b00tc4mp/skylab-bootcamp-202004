import React from 'react'
import { updatePetition, addMemberDepartment } from 'work-meeting-client-logic'
import './PetitionsResults.sass'
export default function ({ petitions, workGroupId, departments, handleToRender }) {
    let departmentId = departments[0]._id.toString()
    function handlePetition(userId, petitionId, workGroupId, status) {
       
                (async()=>{

                    try {
                   
                    await addMemberDepartment(userId, workGroupId, departmentId)
                    
                    await updatePetition(userId, workGroupId, petitionId, status)
                    handleToRender()
                    } catch (error) {
                       
                        console.log(error.message)
                    }
                    

                })()
                
              

       
    }

    const handleDepartment=(event)=>{
        event.preventDefault()
        let department = event.target.value
        departmentId=department

        
    }



    return <section className="petitions">
        <fieldset className="petitions__form">
            <legend>Petitions</legend>
        <form className="petitions">
            {
                petitions && <ul className="petitions__container">
                    {petitions.map(({ id, user }) =>
                        <li className="petitions__item" key={user.name}>
                            <a>{user.name + "  " + user.surname}</a>
                            {<select onChange={handleDepartment} className="petitions__options" name="department">
                                {departments.map((department) =>
                                    <option  value={department._id} >{department.name}</option>
                                )}</select>}<button onClick={(event) => {event.preventDefault();handlePetition(user.id.toString(), id, workGroupId, 'accepted')}}>Accept</button><button onClick={() => handlePetition(user.id, id, workGroupId, 'dennied')}>Deny</button>

                        </li>)}
                </ul>

            }
        </form>
            </fieldset>
    </section>

}