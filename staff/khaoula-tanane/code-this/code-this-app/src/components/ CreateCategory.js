import React, { useState, useEffect } from "react"
import { createCategory, retrieveChallenges } from "code-this-client-logic";
import MultiSelect from "react-multi-select-component";
import  Categories from './Categories'
import Alert from './Alert'

function CreateCategory(props) {
    const [ message, setMessage ] = useState(null)
    const [ categoryName, setCategoryName] = useState('')
    const [ challenges, setChallenges] = useState([])
    const [selected, setSelected] = useState([]);
    const [loadCategories, setLoadCategories] = useState(true)
    

    useEffect(() => {
        handleRetrieveChallenges()
    }, [])


    const handleOnChange = (event) => {
        const {target: {value}} = event
        setCategoryName(value)
    }

    const handleSaveCategory = () => {
        const selectedChallenges = selected.map(({value}) => value)
        try {
            createCategory(categoryName, selectedChallenges)
                .then(()=> {
                    setLoadCategories(false)
                    setCategoryName('')
                    setSelected([])
                    setLoadCategories(true)
                    handleAlert({
                        message: 'Category created successfully',
                        status: 'success'
                    })
                })
                .catch(({message}) => {
                    handleAlert({
                        message,
                        status: 'error'
                    })
                })
        } catch ({message}) {
            handleAlert({
                message,
                status: 'error'
            })
        }
    }

    const handleRetrieveChallenges = async ()=> {
        try {
            retrieveChallenges()
                .then(_challenges=> setChallenges(_challenges))
                .catch(({message}) => {
                    handleAlert({
                        message,
                        status: 'error'
                    })
                })
        } catch ({message}) {
            handleAlert({
                message,
                status: 'error'
            })
        }
    }

    const handleAlert = (alertInfo) => {
        setMessage(alertInfo)
        setTimeout(() => {
            setMessage(null)
        }, 10000)
    }

    return (
        <>
            {message && <Alert {...message}/>}
            <div className="widget">
                <div className="title">Add Category</div>
                <input className="add-category" placeholder="Category name" name='category' value={categoryName} onChange={handleOnChange} />
                <MultiSelect
                    options={challenges.map(({description, _id}) => ({label: description, value: _id}))}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                />
                <button className="add-category" onClick={handleSaveCategory}>SAVE</button>
            </div>

            <div className="widget widget--categories">
                <div className="title">All Categories</div>
                <div className="categories-container">
                    {loadCategories && <Categories isAdmin handleAlert={handleAlert}/>}
                </div>
            </div>

        </>
    )
}

export default CreateCategory