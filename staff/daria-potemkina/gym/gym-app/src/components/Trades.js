import React from 'react'
import './Portfolio.sass'

export default function ({ trades }) {
    return <section>
        <ul className="portfolio__trades">
            {
                trades.trades.map(({ price: { price }, type, quantity })=> 
                <li key={`${price}-${quantity}`} className="trades__items">
                    <p className="trades__trade-type">{type}</p>
                    <p className="trades__quantity">{quantity}</p>
                    <p className="trades__price">{`${price}€`}</p>
                </li>
            )}
        </ul>
    </section>
}



