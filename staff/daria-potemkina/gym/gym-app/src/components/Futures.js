import React, { useState } from 'react'
import { retrieveFuturesPrices } from 'gym-client-logic'

export default function ({ futures, handleGoToDetails, handleShowUnderlyingPrices }) {
    return <section className='products'>
        <ul>{
            futures.map(({ _id, ticker, settlementDate, priceId, price }) =>
                <li className='products__future'>
                    <p>{ticker}</p>
                    <p>{settlementDate}</p>
                    <p>{price}</p>
                    <button onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(_id, ticker)
                        // handleShowUnderlyingPrices(ticker)
                    }}>+</button>
                    <button>Buy</button>
                    <button>Sell</button>
                </li>
            )}
        </ul>

    </section>
}