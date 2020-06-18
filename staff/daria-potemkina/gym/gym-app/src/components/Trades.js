import React from 'react'

export default function ({ trades }) {
    return <section>
        <ul>
            {
                trades.trades.map(({ price: { price }, type, quantity })=> 
                <li>
                    <p>{type}</p>
                    <p>{quantity}</p>
                    <p>{price}</p>
                </li>
            )}
        </ul>
    </section>
}



