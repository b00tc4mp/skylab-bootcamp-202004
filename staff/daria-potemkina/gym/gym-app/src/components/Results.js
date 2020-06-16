import React from 'react'

export default function ({ results, handleGoToDetails }) {
return <section className='products'>
        <ul>{
            results.map(({ _id, ticker, settlementDate, priceId, price }) =>
                <li className='products__future'>
                    <p>{ticker}</p>
                    <p>{settlementDate}</p>
                    <p>{price}</p>
                    <button onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(_id, ticker, results)
                    }}>+</button>
                    <button>Buy</button>
                    <button>Sell</button>
                </li>
            )}
        </ul>
    </section>
}