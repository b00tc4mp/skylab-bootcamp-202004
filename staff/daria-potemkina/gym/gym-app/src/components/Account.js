import React, { useEffect, useState } from 'react'
import { retrieveUserBalance, retrieveUserCard } from 'gym-client-logic'

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
    }, [])

    useEffect(() => {
        try {
            retrieveUserBalance(token)
                .then(balance => setBalance(balance))
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }, [])


    return <section>
        {card &&
            <section>
                <h1>Card</h1>
                <p>{card.number}</p>
                <p>{card.holder}</p>
            </section>}
        {balance &&
            <section>
                <h1>Details</h1>
                <ul>
                    {balance.map(({ date, guarantee, profitAndLoss }) =>
                        <li className='balance-item'>
                            <p>{date}</p>
                            <p>{guarantee}</p>
                            <p>{profitAndLoss}</p>
                        </li>
                    )}
                </ul>
            </section>
        }

    </section>
}