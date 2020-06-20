import React, { useState } from "react"
import { createCategory } from "code-this-client-logic";


function CreateCategory() {

    const [ error, setError ] = useState(null)
    const [ categoryName, setCategoryName] = useState(null)

    const handleOnChange = (event) => {
        const {target: {value}} = event
        setCategoryName(value)
        console.log(value)
    }

    const handleSaveCategory = () => {
        try {
            createCategory(categoryName)
                .then(()=> console.log('saved'))
                .catch(error => setError(error.message))
        } catch ({message}) {
            console.log(message)
            setError(message)
        }
    }

    return (
          <div className="form-container">
            <input placeholder="category" name='category' onChange={handleOnChange} />
            <button onClick={handleSaveCategory}>SAVE</button>
          </div>
    )
}

export default CreateCategory