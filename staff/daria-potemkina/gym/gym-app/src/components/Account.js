import React, { useEffect, useState } from 'react'
import { retrieveUserBalance, retrieveUserCard } from 'gym-client-logic'
import Feedback from './Feedback'
import './Account.sass'
import Spinner from './Spinner'

export default function () {
    const [card, setCard] = useState()
    const [error, setError] = useState()
    const [balance, setBalance] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            retrieveUserCard()
                .then(card => {
                    setCard(card)
                })
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            (async() => {
                try {
                    retrieveUserBalance()
                        .then(balance => {
                            setBalance(balance)
                            setLoading(false)})
                        .then(() => setError(undefined))
                        .catch(({ message }) => {
                            setError(message)
                            setLoading(false)})
                } catch ({ message }) {
                    setError(message)
                    setLoading(false)
                }
            })()
        }, 1000)
        return() => clearTimeout(timer)
    }, [balance])

    
    return <section className="account">
    {loading && <Spinner />}
    
        {card && balance &&
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
                        <li key={`${date}+${guarantee}+${profitAndLoss}`} className='account__balance-item'>
                            <p>{date}</p>
                            <p>{`${guarantee}€`}</p>
                            <p>{`${profitAndLoss}€`}</p>
                        </li>
                    )}
                </ul>
            </section>
        }
        {error && !loading && <Feedback message={error} level='error' />}
    </section>
}