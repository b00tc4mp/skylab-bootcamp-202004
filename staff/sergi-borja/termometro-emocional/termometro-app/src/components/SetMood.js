import React from 'react'
const  { setMood } = require('termometro-client-logic')

function SetMood({token}) {

    const handleSetMood = (event) => {

        event.preventDefault()

        let { moodScore } = event.target

        moodScore = moodScore.value

        try {
            setMood(token, moodScore)
        } catch(error) {
            if(error) throw error
        }
    }

    return (
        <section>
        <h1>SET MOOD HERE</h1>
        <form onSubmit={handleSetMood}>
        <input name='moodScore' placeholder='Cómo te sientes 1-10'></input>
        <button>SUBMIT</button>
        </form>
        </section>
    )
}

export default SetMood