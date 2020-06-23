import React from 'react'
import './Portfolio.sass'

export default function ({ trades }) {
    return <section className="portfolio__sections">
        {trades.productType === "future" ?
            <ul>
                {
                    trades.trades.map(({ price: { price }, type, quantity }) =>
                        <li className="portfolio__trades-items" key={`${price}-${quantity}`}>
                            <p className="trades__trade-type">{type}</p>
                            <p className="trades__quantity">{quantity}</p>
                            <p className="trades__price">{`${price}€`}</p>
                        </li>
                    )}
            </ul> :
            <ul>
                {
                    trades.trades.map(({ price: { price }, type, quantity }) =>
                        <li className="portfolio__trades-items-options" key={`${price}-${quantity}`}>
                            <p className="trades__trade-type">{type}</p>
                            <p className="trades__trade-type">{trades.type.side}</p>
                            <p className="trades__trade-type">{`${trades.type.strike}€`}</p>
                            <p className="trades__quantity">{quantity}</p>
                            <p className="trades__price">{`${price}€`}</p>
                        </li>
                    )}
            </ul>
        }
    </section>
}



