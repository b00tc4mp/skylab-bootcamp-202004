import React from 'react'

export default function ({ options, handleGoToDetails}) {

    return <section className='products'>
        <ul>{
            options.map(option =>
                <li className = "products__option">
                    <p>{option.ticker}</p>
                    <p>{option.settlementDate}</p>
                    <p>{option.side}</p>
                    <p>{option.strike}</p>
                    <p>{option.price}</p>
                    <button onClick={event => {
                        event.preventDefault()

                        handleGoToDetails(option)
                    }}>Details</button>
                    <form >
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
                    </form>
                </li>
            )}
        </ul>
    </section>
}