import React, { useState } from 'react'
import { searchUsers, addMemberSummary, addDepartmembersSummary } from 'work-meeting-client-logic'
import Feedback from './Feedback'
import './AddMemberSummary.sass'

export default function ({ workGroupId, summaryId, departments, toRender }) {

    let departmentId = departments[0]._id.toString();
    const [searchResults, setSearchResults] = useState()
    const [error, setError] = useState()
    const [succes, setSucces] = useState()


    const handleSearch = (event) => {
        event.preventDefault()
        let query = event.target.query.value
        debugger
        searchUsers(workGroupId, query)
            .then((results) => setSearchResults(results))
            .catch(error => setError(error.message))
    }


    const handleDepartment = (event) => {
        event.preventDefault()
        let department = event.target.value
        departmentId = department


    }

    function handleAddUser(userId, name) {
       
        addMemberSummary(userId, summaryId)
            .then(() => setSucces(`${name} correctly added`))
            .then(()=>toRender())
            .catch(error => setError(error.message))
    }

    function handleSubmit() {
        try {
            addDepartmembersSummary(departmentId, summaryId)
            .then(()=>setSucces('Department members correctly added'))
            .then(()=>toRender())
            
        } catch (error) {
            setError(error.message)
        }
        

    }

    return <section className="users">
         <fieldset className="users__field">
            <legend>Add member in summary</legend>
        <form onSubmit={handleSearch}>
            <input type="text" name="query" placeholder="Search user" required />

            <button className="users__btn1">Search</button>
        </form>
        {searchResults && <ul className="users__container">
            {searchResults.map(({ name, surname, id }) =>
                <li className="users__item" key={name}>
                    <a>{name + "  " + surname}</a><button className="users__btn" onClick={() => handleAddUser(id, name)}>Add</button></li>)}
        </ul>}
        <fieldset className="users__field1">
            <legend>Add department in summary</legend>
        {departments && <select onChange={handleDepartment} className="options" name="department">
            {departments.map((department) =>
                <option value={department._id} >{department.name}</option>
            )}</select>}<button className="users__btn" onClick={() => handleSubmit()}>Add</button>
        {error && <Feedback message={error} level="error" />}
        {succes && <Feedback message={succes} level="succes" />}

        </fieldset>
                </fieldset>
    </section>
}