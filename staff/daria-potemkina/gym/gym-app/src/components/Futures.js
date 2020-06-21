import React, { useState } from 'react'
import { addProduct } from 'gym-client-logic'
import Feedback from './Feedback'
import './Products.sass'

export default function ({ futures, handleGoToDetails, token }) {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const handleSubmit = (event, id, priceId) => {
        event.preventDefault()

        let { quantity, side } = event.target

        quantity = Number(quantity.value)
        side = side.value

        try {
            addProduct(token, id, priceId, side, quantity)
                .then(() => {
                    setSuccess({ id, message: 'trade has been added to your portfolio' })
                    return
                })
                .catch(({message}) => {
                    setError([id, message])}
                    )
        } catch ({ message }) {
            setError([id, message])
        }
    }

    return <section className='products'>
        <h1 className="products__title">Futures</h1>
        <ul className="products__items">{
            futures.map(item =>
                <li className='products__item'>
                    <button className="products__details" onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(item)
                    }}>
                        <p>{item.ticker}</p>
                        <p>{item.settlementDate}</p>
                        <p>{`${item.price}€`}</p>
                    </button>
                    <section className="products__form">
                        <form onSubmit={event => handleSubmit(event, item._id, item.priceId)}>
                            <section className="products__select">
                                <select className="products__input" name="quantity">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <select className="products__input" name='side'>
                                    <option value='Buy'>Buy</option>
                                    <option value='Sell'>Sell</option>
                                </select>
                            </section>
                            <button className="products__button">Trade</button>
                            {error && error[0] === item._id && <Feedback message={error[1]} />}
                            {success && success.id === item._id && <Feedback message={success.message} />}
                        </form>
                    </section>
                </li>
            )}
        </ul>

    </section>
}