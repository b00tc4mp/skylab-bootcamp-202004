import React, { useState } from 'react'
import { addProduct } from 'gym-client-logic'
import Feedback from './Feedback'

export default function ({ token, options, handleGoToDetails }) {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    return <section className='products'>
        <ul>{
            options.map(option =>
                <li className="products__option">
                    <p>{option.ticker}</p>
                    <p>{option.settlementDate}</p>
                    <p>{option.side}</p>
                    <p>{option.strike}</p>
                    <p>{option.price}</p>
                    <button onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(option)
                    }}>Details</button>
                    <form onSubmit={event => {
                        event.preventDefault()

                        let { quantity, side } = event.target

                        quantity = Number(quantity.value)
                        side = side.value
                        debugger
                        try {
                            addProduct(token, option._id, option.priceId, side, quantity)
                                .then(() => setSuccess('product added to the portfolio'))
                                .catch(({ message }) => setError(message))
                        } catch ({ message }) {
                            setError(message)
                        }
                    }}>
                        <select name="quantity">
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
                        <select name='side'>
                            <option value='Buy'>Buy</option>
                            <option value='Sell'>Sell</option>
                        </select>
                        <button>Trade</button>
                        {error && <Feedback message={error} level="error" />}
                        {success && <Feedback message={success} level="" />}
                    </form>
                </li>
            )}
        </ul>
    </section>
}