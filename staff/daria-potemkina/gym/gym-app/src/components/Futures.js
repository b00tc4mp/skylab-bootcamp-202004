import React from 'react'

export default function ({ futures }) {

    return <section className='products'>
        <ul>{
            futures.map(({ _id, ticker, settlementDate, priceId, price }) =>
                <li className = 'products__future'>
                    <p>{ticker}</p>
                    <p>{settlementDate}</p>
                    <p>{price}</p>
                    <button>+</button>
                    <button>Buy</button>
                    <button>Sell</button>
                </li>
            )}
        </ul>
    </section>
}