import React from 'react'
import './Portfolio.sass'

export default function ({ trades }) {
    return <section>
        <ul className="portfolio__trdaes">
            {
                trades.trades.map(({ price: { price }, type, quantity })=> 
                <li className="portfolio__item">
                    <p>{type}</p>
                    <p>{quantity}</p>
                    <p>{`${price}€`}</p>
                </li>
            )}
        </ul>
    </section>
}



