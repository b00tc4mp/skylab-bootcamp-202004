import React, { useState } from 'react'
import { retrieveSummaryMembers } from 'work-meeting-client-logic'
import CreateSummary from './CreateSummary'
import SummaryAdmin from './SummaryAdmin'
import './MeetSummariesList.sass'
export default function ({ title, content, workGroupId, meetingId, summaries, departments, toRender }) {
    const [show, setShow] = useState()
    const [summaryId, setSummaryId] = useState()
    const [_title, _setTitle] = useState()
    const [_content, _setContent] = useState()
    const [readBy, setReadBy] = useState()
    const [members, setMembers] = useState()
    debugger
    let _toRender = () =>
        retrieveSummaryMembers(summaryId)
            .then(_members => setMembers(_members))

    function handleCreateSummary() {

        setShow(true)
    }
    function handleSummary(summaryId, title, content, readBy) {
        (async () => {
            debugger
            let _members = await retrieveSummaryMembers(summaryId)
            setMembers(_members)
            _setContent(content)
            _setTitle(title)
            setReadBy(readBy)
            setSummaryId(summaryId)
        })()

    }
    let renderize = () => toRender()
    return <section className="summaries">
        <fieldset className="summaries__field">
            <legend className='summaries__legend'>{title}</legend>
            <h1 className='summaries__h1'>{content}</h1>
            <button className='summaries__btn' onClick={() => handleCreateSummary()}>Create new summary</button>
            {show && <CreateSummary workGroupId={workGroupId} meetingId={meetingId} departments={departments} toRender={renderize} />}
        </fieldset>

        {
            summaries && <ul className="summaries__container">
                {summaries.map(({ title, content, readBy, id }) =>
                    <li className="summaries__item" key={title}>
                        <a onClick={() => { handleSummary(id, title, content, readBy) }}> {title} </a>
                    </li>)}
            </ul>

        }
        {summaryId && _title && _content && members && readBy && <SummaryAdmin summaryId={summaryId} title={_title} content={_content} members={members} readBy={readBy} workGroupId={workGroupId} departments={departments} toRender={_toRender} />}

    </section>

}