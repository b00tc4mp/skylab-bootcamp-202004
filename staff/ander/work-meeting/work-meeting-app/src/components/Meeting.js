import React, { useState, useEffect } from 'react'
import { retrieveUser, createMeeting} from 'work-meeting-client-logic'
export default function ({token}) {
  const [_token, setToken] = useState(token)
  
  const handleSubmitCreate = (event) => {
    event.preventDefault()
    let { title, content } = event.target
    title = title.value
    content = content.value
    try {
        retrieveUser(_token)
            .then(body => {
                const { id } = body
                return id
            })
            .catch(error => { if (error) throw error })
            .then(id => createMeeting(title, content, id))
            .catch(error => { if (error) throw error })

    } catch (error) {
        if (error) throw error
    }

}
      return <section className="meeting">
      <h1>Create new Meeting</h1>
      <form onSubmit={handleSubmitCreate}>
          <input type="text" name="title" placeholder="" />
          <input type="text" name="content" placeholder="" />
          <button>Save</button>    
        </form>
  </section>
}