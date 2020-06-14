import React from 'react'

export default function ({ options }) {

    return <section className='products'>
        <ul>{
            options.map(({ _id, ticker, settlementDate, side, strike, priceId, price }) =>
                <li className = "products__option">
                    <p>{ticker}</p>
                    <p>{settlementDate}</p>
                    <p>{side}</p>
                    <p>{strike}</p>
                    <p>{price}</p>
                    <button>+</button>
                    <button>Buy</button>
                    <button>Sell</button>
                </li>
            )}
        </ul>
    </section>
}