import React, { useState, useEffect } from 'react'
import { context, addReadBy, retrieveReadBy, retrieveUser } from 'work-meeting-client-logic'
import Feedback from './Feedback'
import './SummaryReadBy.sass'

export default function ({ title, content, summaryId, alreadyRead, toRender }) {
    const { token } = context.storage
    const [error, setError] = useState()
    const [succes, setSucces] = useState()

    debugger
    /*  useEffect(() => {
         (async () => {
             debugger
             const readBy = await retrieveReadBy(summaryId)
             debugger
             const { id } = await retrieveUser(token)
             let value = readBy.some((element) => element== id.toString())
             setAlreadyRead(value)
         })()
 
     }, [alreadyRead]) */

    function addRead() {
        (async () => {
            try {
                await addReadBy(summaryId)
                toRender()
            } catch (error) {
            }
        })()
    }

    return <section className="readby">
        <fieldset className="readby__field">
            <legend className="readby__legend">{title}</legend>
            <label className="readby__label">{content}</label>
            {!alreadyRead && <button className="readby__btn" onClick={() => { addRead() }}>I have read the summary</button>}
        </fieldset>
    </section>

}