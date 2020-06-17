import React, { useState } from 'react'
import { addProduct } from 'gym-client-logic'
import Feedback from './Feedback'

export default function ({ futures, handleGoToDetails, token }) {
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    return <section className='products'>
        <ul>{
            futures.map(item =>
                <li className='products__future'>
                    <p>{item.ticker}</p>
                    <p>{item.settlementDate}</p>
                    <p>{item.price}</p>
                    <button onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(item)
                    }}>Details</button>
                    <section>
                        <form onSubmit={event => {
                            event.preventDefault()
                            
                            setError(undefined)
                            setSuccess(undefined)

                            let { quantity, side } = event.target

                            quantity = Number(quantity.value)
                            side = side.value
                            debugger
                            try {
                                addProduct(token, item._id, item.priceId, side, quantity)
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
                            {success && <Feedback message={success} level=""/>}
                        </form>
                    </section>
                </li>
            )}
        </ul>

    </section>
}