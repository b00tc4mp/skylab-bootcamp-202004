import React, { useState , useRef} from 'react'
import { createSummary } from 'work-meeting-client-logic'
import AddMemberSummary from './AddMemberSummary'
import './CreateSummary.sass'
export default function ({ workGroupId, meetingId, departments, toRender }) {
  const [summaryId, setSummaryId] = useState(null)
  const [show, setShow] = useState()
  const titleValue = useRef()
  const contentValue = useRef()

  const handleCreateSummary = (event) => {
    event.preventDefault()
   /*  let { title } = event.target
    title = title.value
    let { content } = event.target
    content = content.value */
  let title = titleValue.current.value
  let content = contentValue.current.value

    createSummary(workGroupId, meetingId, title, content)
      .then(summary => {
        setSummaryId(summary._id)
        setShow(true)
        toRender()
        titleValue.current.value=""
        contentValue.current.value=""
      })

  }
  return <section className="summary">
    <form onSubmit={handleCreateSummary}>
      <input type="text" name="title" ref={titleValue} placeholder="Title" required  />
      <input type="text" name="content" ref={contentValue} placeholder="Summary content" required  />

      <button>Save</button>
    </form>
    {/* {show && <AddMemberSummary workGroupId={workGroupId}summaryId={summaryId} departments={departments} />} */}
  </section>
}