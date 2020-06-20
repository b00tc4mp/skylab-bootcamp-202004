import React, { useState } from "react"
import Feedback from './Feedback'
import Editor from "./Editor";
import './CreateChallenge.sass'
import { createChallenge } from "code-this-client-logic";


function CreateChallenge() {

    const [ error, setError ] = useState(null)
    const [ form, setForm] = useState({
        difficulty: 'Easy'
    })
    const [ initialCode, setEditorInitialCode] = useState('')
    const [ tests, setEditorTests] = useState('')



    const handleOnInitialCodeChange = (event, value) => {
        setEditorInitialCode(value)    
    };

    const handleOnTestChange = (event, value) => {
        setEditorTests(value)    
    };
    

    const handleOnChange = (event) => {
        const {target: {value, name}} = event
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSaveChallenge = () => {
        try {
            createChallenge({...form, initialCode, tests})
                .then(()=> console.log('saved'))
                .catch(error => setError(error.message))
        } catch ({message}) {
            console.log(message)
            setError(message)
        }
    }

    return (
          <div className="form-container">
              <div className='editor-create'>
                  <p> write intial code to guide user!</p>
            <Editor onChange={handleOnInitialCodeChange} />
              </div>
            
            <textarea placeholder="description" name='description' onChange={handleOnChange} ></textarea>
            
            <select name='difficulty' onChange={handleOnChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
            </select>
            <div className='editor-create'>
                <p>write tests to pass</p>
            <Editor onChange={handleOnTestChange} />
            </div>

            <button onClick={handleSaveChallenge}> SAVE </button>

            
          </div>
    )
}


export default CreateChallenge