import React, { useEffect, useState } from 'react'
import { retrieveUserBalance, retrieveUserCard } from 'gym-client-logic'
import Feedback from './Feedback'
import './Account.sass'

export default function ({ token }) {
    const [card, setCard] = useState()
    const [error, setError] = useState()
    const [balance, setBalance] = useState()

    useEffect(() => {
        try {
            retrieveUserCard(token)
                .then(card => {
                    setCard(card)
                })
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }, [token])

    useEffect(() => {
        try {
            retrieveUserBalance(token)
                .then(balance => setBalance(balance))
                .then(() => setError(undefined))
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }, [token])


    return <section className="account">
        {card &&
            <section className="account__card">
                <h1 className="account__title">Card</h1>
                <section className="account__card-details">
                    <p>Number</p>
                    <p>{card.number}</p>
                    <p>Holder</p>
                    <p>{card.holder}</p>
                </section>
            </section>}
        {balance &&
            <section>
                <h1 className="account__title">Details</h1>
                <ul className="account__header">
                    <li>Date</li>
                    <li>Guarantee</li>
                    <li>Balance</li>
                </ul>
                <ul>
                    {balance.map(({ date, guarantee, profitAndLoss }) =>
                        <li className='account__balance-item'>
                            <p>{date}</p>
                            <p>{`${guarantee}€`}</p>
                            <p>{`${profitAndLoss}€`}</p>
                        </li>
                    )}
                </ul>
            </section>
        }
        {error && <Feedback message={error} level='error' />}
    </section>
}