import React, { useState } from "react"
import Editor from "./Editor";
import Alert from './Alert'
import { createChallenge } from "code-this-client-logic";
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();


function CreateChallenge() {

    const [ message, setMessage ] = useState(null)
    const [ form, setForm] = useState({
        difficulty: 'Easy'
    })
    const [ initialCode, setEditorInitialCode] = useState('')
    const [ tests, setEditorTests] = useState('')
    const [ showForm, setShowForm] = useState(true)


    const handleOnInitialCodeChange = (event, value) => {
        setEditorInitialCode(value)    
    };

    const handleOnTestChange = (event, value) => {
        setEditorTests(value)    
    };
    

    const handleOnChange = (event) => {
        const {target: {value: difficulty}} = event
        setForm({
            ...form,
            difficulty
        })
    }

    const handleMdEditorOnChange = ({text: description}) => {
        setForm({
            ...form,
            description
        })
    }

    const handleSaveChallenge = () => {
        try {
            createChallenge({...form, initialCode, tests})
                .then(()=> {
                    setShowForm(false)
                    setForm({
                        difficulty: 'Easy'
                    })
                    setEditorTests('')
                    setEditorInitialCode('')
                    handleAlert({
                        message: 'Challenge created successfully',
                        status: 'success'
                    })
                    setShowForm(true)
                })
                .catch((message) => handleAlert({
                    message,
                    status: 'error'
                }))
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
            <div className="title">Add Challennge</div>

            {showForm && (
                <>
                    <div className="widget">
                <div className="title">Intial code to guide user</div>
                    <Editor onChange={handleOnInitialCodeChange} />
            </div>


            <div className="widget">
                <div className="title">Tests to pass</div>
                    <Editor onChange={handleOnTestChange} />
            </div>

            <MdEditor
                value=""
                style={{ height: "200px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleMdEditorOnChange}
                />

            <select className="select" selected={form.difficulty} name='difficulty' onChange={handleOnChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
            </select>
            <button onClick={handleSaveChallenge}> SAVE </button>
                </>
            )}
        </>
    )
}


export default CreateChallenge