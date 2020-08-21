import React, { useState, useEffect, useRef } from 'react'
import { createMeeting, retrieveWorkGroupPref } from 'work-meeting-client-logic'
import Feedback from './Feedback'
import './CreateMeeting.sass'
export default function () {
  const [error, setError] = useState()
  const [succes, setSucces] = useState()
  const titleValue = useRef()
  const contentValue = useRef()

  const handleSubmitCreate = (event) => {
    event.preventDefault()
    /*   let { title, content } = event.target
      title = title.value
      content = content.value */
    let title = titleValue.current.value
    let content = contentValue.current.value


    return (async () => {
      try {
        const workGroupPref = await retrieveWorkGroupPref()
        debugger
        await createMeeting(workGroupPref.id.toString(), title, content)
        setError(null)
        setSucces("Meeting created")
        titleValue.current.value = ""
        contentValue.current.value = ""

      } catch (error) {
        setError(error.message)
        setSucces(null)
      }
    })()

  }
  return <section className="meeting">
    <fieldset className="meeting__field">
      <legend>Create new meeting</legend>
      <form className="meeting_form" onSubmit={handleSubmitCreate}>
        <input type="text" ref={titleValue} placeholder="Meeting title"  name="title" required  />
        <textarea  type="text" ref={contentValue} placeholder="Meeting content" name="content"  cols="40" rows="10" required></textarea>
        <button>Save</button>
        {error && <Feedback message={error} level="error" />}
        {succes && <Feedback message={succes} level="succes" />}
      </form>
    </fieldset>
    
  </section>
}