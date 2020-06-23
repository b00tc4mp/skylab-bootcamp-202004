import React, { useState, useEffect } from 'react'
import { addUserCard, retrieveUserCard } from 'gym-client-logic'
import Feedback from './Feedback'
import './Settings.sass'

export default function () {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [userCard, setCard] = useState()
    const [cardError, setCardError] = useState()

    useEffect(() => {
        try {
            retrieveUserCard()
                .then(card => {
                    debugger
                    if (typeof card !== 'undefined') setCard(card)
                })
                .catch(error => setCardError(error.message))
        } catch (error) {
            setError(error.message)
        }

    }, [])

    const handleSubmit = event => {
        event.preventDefault()

        let { number1, number2, number3, number4, holder, expirationDate, cvv } = event.target

        number1 = number1.value
        number2 = number2.value
        number3 = number3.value
        number4 = number4.value
        holder = holder.value
        expirationDate = new Date(expirationDate.value)
        cvv = cvv.value

        const number = number1 + number2 + number3 + number4

        try {
            addUserCard(number, holder, expirationDate, cvv)
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

    return <section className="settings">
        <h1 className="settings__name">Add or modify your account</h1>
        {typeof userCard !== 'undefined' && (<>
            <form className="settings__form" onSubmit={handleSubmit}>
                <section className="settings__card">
                    <input className="settings__input settings__card-num" type="text" name="number1" maxlength="4" placeholder="1234" defaultValue={`${userCard.number.slice(0, 4)}`}></input>
                    <input className="settings__input settings__card-num" type="text" name="number2" maxLength="4" placeholder="1234" defaultValue={`${userCard.number.slice(4, 8)}`}></input>
                    <input className="settings__input settings__card-num" type="text" name="number3" maxLength="4" placeholder="1234" defaultValue={`${userCard.number.slice(8, 12)}`}></input>
                    <input className="settings__input settings__card-num" type="text" name="number4" maxLength="4" placeholder="1234" defaultValue={`${userCard.number.slice(12, 17)}`}></input>
                </section>
                <input className="settings__input" type="text" name="holder" defaultValue={userCard.holder} placeholder="Jonh Doe"></input>
                <input className="settings__input" type="date" name="expirationDate"></input>
                <input className="settings__input" type="password" name="cvv" maxLength='3' placeholder='cvv'></input>
                <button className="settings__button">Submit</button>
                {/* defaultValue={(new Date(`${userCard.expirationDate} UTC`)).toISOString().substr(0, 10)} */}
            </form>
        </>)}

        {typeof userCard === 'undefined' && (<>
            <form className="settings__form" onSubmit={handleSubmit}>
                <section className="settings__card">
                    <input className="settings__input settings__card-num" type="text" name="number1" maxlength="4" placeholder="1234"></input>
                    <input className="settings__input settings__card-num" type="text" name="number2" maxLength="4" placeholder="1234"></input>
                    <input className="settings__input settings__card-num" type="text" name="number3" maxLength="4" placeholder="1234"></input>
                    <input className="settings__input settings__card-num" type="text" name="number4" maxLength="4" placeholder="1234"></input>
                </section>
                <input className="settings__input" type="text" name="holder" placeholder="Jonh Doe"></input>
                <input className="settings__input" type="date" name="expirationDate"></input>
                <input className="settings__input" type="password" name="cvv" maxLength='3' placeholder='cvv'></input>
                <button className="settings__button">Submit</button>
            </form>
        </>)}

        {error && !cardError && <Feedback message={error.message} level="error" />}
        {success && <Feedback message={success} />}
    </section>
}