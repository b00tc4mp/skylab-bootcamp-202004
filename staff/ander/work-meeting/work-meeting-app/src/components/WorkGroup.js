import React, { useState, useEffect, useRef } from 'react'
import { context, retrieveUser, retrieveDepartments, retrieveWorkGroup, retrievePetitionAll, retrieveWorkGroupPref, createDepartment, searchWorkGroups, retrieveWorkGroups, createWorkGroup, changeWorkGroup } from 'work-meeting-client-logic'
import SearchWorkGroupResults from './SearchWorkGroupResult'
import PetitionsResults from './PetitionsResults'
import Feedback from './Feedback'
import './WorkGroup.sass'
export default function ({ onWorkGroupPref }) {
    debugger
    const { token } = context.storage
    const [workGroupPrefId, setWorkGroupPrefId] = useState()
    const [workGroups, setWorkGroups] = useState()
    const [workGroupResults, setworkGroupResults] = useState()
    const [error, setError] = useState()
    const [_error, _setError] = useState()
    const [__error, __setError] = useState()
    const [petitions, setPetitions] = useState([])
    const [departments, setDepartments] = useState()
    const [renderCont, setRenderCont] = useState(0)
    const [_renderCont, _setRenderCont] = useState(0)
    const [succes, setSucces] = useState()
    const [admin, setAdmin] = useState(false)
    const workGroupValue = useRef()
    const departmentValue = useRef()
    const departmentValue1 = useRef()
    const [view, setView] = useState(0)


    const handleChangeWorkGroup = (id, name) => {
        (async () => {
            await changeWorkGroup(id)
            let workGroup = await retrieveWorkGroup(id)
            let user = await retrieveUser(token)
            if (user.id == workGroup.creator.toString()) setAdmin(true)
            else setAdmin(false)
            debugger
            onWorkGroupPref(name)

            setWorkGroupPrefId(id)
            setPetitions(null)


        })()
    }
    useEffect(() => {
        (async () => {

            let _workGroups = await retrieveWorkGroups()
            setWorkGroups(_workGroups)

        })()
    }, [_renderCont])

    useEffect(() => {
        (async () => {
            debugger
            try {
                const _workGroupPref = await retrieveWorkGroupPref(token)
                let workGroup = await retrieveWorkGroup(_workGroupPref.id.toString())
                let user = await retrieveUser(token)
                debugger
                if (user.id == workGroup.creator.toString()) {
                    let petitions = await retrievePetitionAll(_workGroupPref.id.toString())
                    setWorkGroupPrefId(_workGroupPref.id.toString())
                    if (petitions) setPetitions(petitions)
                    let department = await retrieveDepartments(workGroupPrefId)
                    setDepartments(department)
                    setAdmin(true)
                }
                else setAdmin(false)



            } catch (error) {

            }
        })()
    }, [workGroupPrefId, renderCont])


    const handleSubmitCreate = (event) => {
        event.preventDefault()
        /* let { workGroup , department} = event.target
        debugger
        workGroup = workGroup.value
        console.log(event.target.value)
        
        department = department.value */
        let workGroup = workGroupValue.current.value
        let department = departmentValue.current.value

        createWorkGroup(workGroup)
            .then(() => retrieveWorkGroupPref(token))
            .then((workGroupPref) => {
                _setRenderCont(_renderCont + 1)
                //setWorkGroups([{ name: workGroup }, ...workGroups])
                setWorkGroupPrefId(workGroupPref.id.toString())
                createDepartment(workGroupPref.id.toString(), department)
                    .then(() => {
                        onWorkGroupPref(workGroupPref.name)
                            _setError(null)
                            setError(null)
                            __setError(null)
                            setSucces(null)
                        
                        workGroupValue.current.value = ""
                        departmentValue.current.value = ""


                    })

            })
            .catch(error => {
                setError(error.message)
                _setError(null)
                __setError(null)
                setSucces(null)
            })


    }

    const handleCreateDepartment = (event) => {
        event.preventDefault()
        /* let { department_ } = event.target
        let department = department_.value */
        let department = departmentValue1.current.value
        createDepartment(workGroupPrefId, department)
            .then(() => {
                setSucces(`Department ${department} created`)
                _setError(null)
                setError(null)
                __setError(null)
                departmentValue1.current.value = ""

                setRenderCont(renderCont + 1)
            })
            .catch(error => {
                __setError(error.message)
                setError(null)
                _setError(null)
                setSucces(null)
            })

    }


    function handleSubmitSearch(event) {
        event.preventDefault()
        let { query } = event.target
        query = query.value

        searchWorkGroups(query)
            .then((results) => setworkGroupResults(results))
            .then(() => {
                _setError(null)
                setError(null)
                __setError(null)
                setSucces(null)
            })
            .catch(error => {
                _setError(error.message)
                setError(null)
                __setError(null)
                setSucces(null)
            })

    }
    function handleToRender() {

        setRenderCont(renderCont + 1)
    }

    return <section className="workGroup">


        {
            workGroups && <ul className="workGroup__container">
                {workGroups.map(({ name, _id }) =>
                    <li className="workGroup__item" key={name}>
                        <a onClick={(event) => { handleChangeWorkGroup(_id, name) }}>{name}</a></li>)}
            </ul>
        }

        <fieldset className="workGroup__form">
            <legend>Create a new work group</legend>
            <form onSubmit={handleSubmitCreate}>

                <input type="text" ref={workGroupValue} name="workGroup" placeholder="Work group name" required  />
                <input type="text" ref={departmentValue} name="department" defaultValue="" placeholder="First department name" required  />
                <button>Create</button>
                {error && <Feedback message={error} level="error" />}
            </form>
        </fieldset>
        <fieldset className="workGroup__form">
            <legend>Search work group</legend>
            <form onSubmit={handleSubmitSearch}>
                <div className="workGroup__form--div">
                    <input type="text" name="query" placeholder="workgroup name" required  />
                    <button>Search</button></div>
                {_error && <Feedback message={_error} level="error" />}
                {workGroupResults && <SearchWorkGroupResults results={workGroupResults} />}
            </form>
        </fieldset>
        {admin && <fieldset className="workGroup__form">
            <legend>ADMIN</legend>
            <form onSubmit={handleCreateDepartment}>
                <fieldset className="workGroup__formex">
                    <legend>Create new department</legend>
                    <input type="text" ref={departmentValue1} name="department_" defaultValue="" placeholder="" required  />
                    <button>Create</button>
                    {succes && <Feedback message={succes} level="succes" />}
                    {__error && <Feedback message={__error} level="error" />}
                </fieldset>
            </form>
            {admin && departments.length && <PetitionsResults petitions={petitions} workGroupId={workGroupPrefId} departments={departments} handleToRender={handleToRender} />}

        </fieldset>}



    </section>
}