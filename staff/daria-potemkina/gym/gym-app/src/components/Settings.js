import React, { useState } from 'react'
import { addUserCard } from 'gym-client-logic'
import Feedback from './Feedback'

export default function ({ token }) {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const handleSubmit = event => {
        event.preventDefault()

        let { number, holder, expirationDate, cvv } = event.target

        number = number.value
        holder = holder.value
        expirationDate = new Date(expirationDate.value)
        cvv = cvv.value

        try {
            addUserCard(token, number, holder, expirationDate, cvv)
                .then(() => {
                    setSuccess('the card is added')
                    setError(undefined)
                })
                .catch(({ message }) => {
                    setError(message)
                    setSuccess(undefined)
                })
        } catch ({ message }) {
            setSuccess(undefined)
            setError(message)
        }
    }

    return <section>
        <h1>Add credit card</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="number" maxlength="15" placeholder="123-123-123-123"></input>
            <input type="text" name="holder" placeholder="Jonh Doe"></input>
            <input type="date" name="expirationDate"></input>
            <input type="text" name="cvv" maxLength='3' placeholder='cvv'></input>
            <button>Submit</button>
        </form>
        {error && <Feedback message={error} level="error" />}
        {success && <Feedback message={success} />}
    </section>

}