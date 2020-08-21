import React, { useState, useEffect } from 'react'
import {
    context, retrieveSummaries, retrieveSummarys, retrieveDepartments
    , retrieveUser, retrieveMeetings, retrieveWorkGroupPref, retrieveReadBy
} from 'work-meeting-client-logic'
import Feedback from './Feedback'
import './MeetingList.sass'
import MeetSummariesList from './MeetSummariesList'
import SummaryReadBy from './SummaryReadBy'
export default function () {
    const { token } = context.storage
    const [error, setError] = useState()
    const [succes, setSucces] = useState()
    const [meetings, setMeeting] = useState()
    const [summaries, setSummaries] = useState()
    const [meetingId, setMeetingId] = useState()
    const [workGroupId, setWorkGroupId] = useState()
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [summariesList, setSummariesList] = useState()
    const [departments, setDepartments] = useState()
    const [renderCount, setRenderCount] = useState(0)
    const [_title, _setTitle] = useState()
    const [_content, _setContent] = useState()
    const [summaryId, setSummaryId] = useState()
    const [alreadyRead, setAlreadyRead] = useState(true)


    function handleToMeetSummaries(title, content, workGroup, meetingId) {
        debugger

        setWorkGroupId(workGroup.toString())
        setTitle(title)
        setContent(content)
        setMeetingId(meetingId)
        retrieveSummarys(meetingId)
            .then((summaries) => setSummaries(summaries))

    }

    function handleToSummaries(title, content, summaryId) {
        (async () => {
            const readBy = await retrieveReadBy(summaryId)
            debugger
            const { id } = await retrieveUser(token)
            let value = readBy.some((element) => element == id.toString())
            setAlreadyRead(value)
            setSummaryId(summaryId)
            _setTitle(title)
            _setContent(content)
        })()


    }

    let renderize = () => setAlreadyRead(true)
    useEffect(() => {
        (async () => {
            try {
                const { id } = await retrieveWorkGroupPref(token)
                debugger
                const _meetings = await retrieveMeetings(id.toString())
                setMeeting(_meetings)
                debugger
                const _summaries = await retrieveSummaries(id.toString())
                setSummariesList(_summaries)
                console.log(_summaries)

                const departments = await retrieveDepartments(id.toString())
                setDepartments(departments)
            } catch (error) {

            }

        })()

    }, [])
    let toRender = () => {
        retrieveSummarys(meetingId)
            .then((summaries) => setSummaries(summaries))
    }
    return <section className="meetings">
        <div className="meetings__grap">
            <fieldset className="meetings__field">
                <legend>Manage your meetings</legend>
                {meetings && <ul className="meetings__container">
                    {meetings.map(({ title, content, date, id, summaries, workGroup }) =>
                        <li className="meetings__item" key={title}>
                            <a onClick={() => handleToMeetSummaries(title, content, workGroup, id)}>{title}</a></li>)}
                </ul>

                }
            </fieldset>
            <fieldset className="meetings__field">
                <legend>Summaries</legend>
                {summariesList && <ul className="meetings__container">
                    {summariesList.map(({ title, content, date, id, workGroup }) =>
                        <li className="meetings__item" key={title}>
                            <a onClick={() => handleToSummaries(title, content, id)}>{title}</a></li>)}
                </ul>
                }
            </fieldset></div>
        {summaryId && _content && _title && <SummaryReadBy title={_title} content={_content} summaryId={summaryId} alreadyRead={alreadyRead} toRender={renderize} />}
        {summaries && <MeetSummariesList title={title} content={content} workGroupId={workGroupId} meetingId={meetingId} summaries={summaries} departments={departments} toRender={toRender} />}
    </section>

}