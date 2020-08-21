import React, { useState } from 'react'
import AddMemberSummary from './AddMemberSummary'
import './SummaryAdmin.sass'
export default function ({ summaryId, title, content, members, readBy, workGroupId, departments, toRender }) {
    debugger
    let renderize = () => toRender()

    return <section className="summariess">
        <fieldset className="summariess__field">
            <legend className="summariess__legend">{title}</legend>
            <h2>{content}</h2>
            <div className='summariess_members'>
                <h1 className='summariess__h1'>members:</h1>
                {members && (<>
                    <ul className="summariess__container">
                    {members.map(({name,surname,_id})=>{
                        let exist= readBy.some(element=> element == _id)
                        debugger
                       return !!exist  ? (<li className="summariess__itemGreen" key={title}>
                        <label>{name + " " + surname}</label>
                        </li> ) : (<li className="summariess__itemRed" key={title}>
                    <label>{name + " " + surname}</label>
                </li>)
                    })}
                </ul>

                </>)}</div>
            {<AddMemberSummary workGroupId={workGroupId} summaryId={summaryId} departments={departments} toRender={renderize} />}
        </fieldset>

    </section>
}