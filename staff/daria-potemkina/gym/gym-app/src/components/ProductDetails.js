import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { addProduct, retrieveProduct, retrieveUnderlyingPrice, retrieveFuturePrices } from 'gym-client-logic'
import './ProductDetails.sass'
import Spinner from './Spinner'
import Feedback from './Feedback'

function ProductDetails({ id, ticker, expanded, history }) {
    const [futureChartData, setFutureChartData] = useState()
    const [underlyingChartData, setUnderlyingChartData] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState()
    const [futurePrice, setFuturePrice] = useState([])
    const [futureDate, setFutureDate] = useState([])
    const [underlyingPrice, setUnderlyingPrice] = useState([])
    const [underlyingDate, setUnderlyingDate] = useState([])

    useEffect(() => {
        const [, , _itemId] = history.location.pathname.split('/')
       
        try {
            retrieveProduct(id || _itemId)
                .then(_product => {
                    
                    setProduct(_product)
                    return retrieveFuturePrices(id || _itemId)
                    .then(prices => {
                        
                        const futurePrice = prices.map(({ price }) => price)
                        const futureDate = prices.map(({ date }) => date)
                        setFutureDate(futureDate)
                        setFuturePrice(futurePrice)
                    })
                    .then(() => retrieveUnderlyingPrice(ticker || _product.ticker))
                    .then(underlyings => {
                        const underlyingPrice = underlyings.map(({ price }) => price)
                        const underlyingDate = underlyings.map(({ date }) => date)
                        setUnderlyingDate(underlyingDate)
                        setUnderlyingPrice(underlyingPrice)
                    })
                    .then(() => setLoading(false))
                })

                .catch(error => {
                    setError(error.message)
                    setLoading(false)
                })
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }, [])

    const Chart = () => {
        
        setFutureChartData({
            labels: futureDate,
            datasets: [
                {
                    label: `${product.ticker}`,
                    lineTension: 0.5,
                    backgroundColor: "rgba(84,114,125,0.1)",
                    borderColor: "rgba(84,114,125,1)",
                    data: futurePrice,
                },
            ],
        })

        setUnderlyingChartData({
            labels: underlyingDate,
            datasets: [
                {
                    label: `${product.ticker}`,
                    lineTension: 0.5,
                    backgroundColor: "rgba(211,147,145,0.1)",
                    borderColor: "rgba(211,147,145,1)",
                    data: underlyingPrice
                }]
        })
    }

    useEffect(() => {
        if (product) {

            Chart()
        }
    }, [underlyingPrice.length, futurePrice.length, underlyingDate.length, futureDate.length])

    const onTrade = event => {
        event.preventDefault()

        let { quantity, side } = event.target

        quantity = Number(quantity.value)
        side = side.value

        try {
            addProduct(product._id, product.priceId, side, quantity)
                .then(() => setSuccess('trade has been added to the portfolio'))
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }

    if (loading) return <div><Spinner /></div>

    return <section className='details'>
        {!expanded && product && product.productType === 'future' &&
            <section>
                <section className='details__data'>
                    <section className='details__price'>
                        <p>{product.productType}</p>
                        <h1 className='details__ticker'>{product.ticker}</h1>
                        <h2>{`${product.price}€`}</h2>
                    </section>
                    <section className="details__item">
                        <p>{product.settlementDate}</p>
                        <p>{`Contract size: ${product.contractSize}`}</p>
                        <p>{product.exchange}</p>
                        <p>{product.sector}</p>
                    </section>
                </section>
                <section>
                    <form className="details__form" onSubmit={onTrade}>
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
                        <button className="details__button">Trade</button>
                    </form>
                </section>
                {error && <Feedback message={error} level="error" />}
                {success && <Feedback message={success} level="" />}
                <section className="details__historics">
                    <Line
                        data={futureChartData}
                        options={{
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    left: 20,
                                    right: 20,
                                    top: 30,
                                    button: 30
                                }
                            },
                            title: {
                                display: true,
                                text: 'Historic prices',
                                fontSize: 15,
                                position: 'top'
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    type: "time",
                                    time: {
                                        unit: 'day',
                                        round: 'day',
                                        displayFormats: {
                                            day: 'MMM D'
                                        }
                                    },
                                    ticks: {
                                        fontSize: 10,
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    ticks: {
                                        presition: 0,
                                        suggestedMin: Math.min(...futurePrice),
                                        suggestedMax: Math.max(...futurePrice),
                                        fontSize: 10,
                                        callback: function (value) {
                                            return value + '€'
                                        }
                                    }
                                }]
                            }
                        }}
                        height={300}
                    />
                </section>
            </section>
        }
        {!expanded && product && product.productType === 'option' &&
            <section>
                <section className='details__data'>
                    <section className='details__price'>
                        <p>{product.productType}</p>
                        <h1 className='details__ticker'> {product.ticker}</h1>
                        <h2>{`${product.price}€`}</h2>
                    </section>
                    <section className="details__item">
                        <p className="details__side">{product.type.side}</p>
                        <p>{`${product.type.strike}€`}</p>
                        <p>{product.settlementDate}</p>
                        <p>{`Contract size: ${product.contractSize}`}</p>
                        <p>{product.exchange}</p>
                        <p>{product.sector}</p>
                    </section>
                </section>
                <section>
                    <form className="details__form" onSubmit={onTrade}>
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
                        <button className="details__button">Trade</button>
                    </form>
                </section>
            </section>
        }
        {error && <Feedback message={error} level="error" />}
        {success && <Feedback message={success} level="" />}
        <section className="details__underlying">
            <Line
                data={underlyingChartData}
                options={{
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 20,
                            right: 20,
                            top: 30,
                            button: 30
                        }
                    },
                    legend: {
                        display: true,
                        boxWidth: 10,
                        padding: 15,

                    },
                    title: {
                        display: true,
                        text: 'Underlying historic prices',
                        fontSize: 15,
                        position: 'top'
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            type: "time",
                            time: {
                                unit: 'day',
                                round: 'day',
                                displayFormats: {
                                    day: 'MMM D'
                                }
                            },
                            ticks: {
                                fontSize: 10,
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontSize: 10,
                                presition: 0,
                                suggestedMin: Math.min(...underlyingPrice),
                                suggestedMax: Math.max(...underlyingPrice),
                                callback: function (value) {
                                    return value + '€'
                                }
                            },
                        }]
                    }
                }}
                height={300}
            />
        </section>

    </section>
}

export default ProductDetails