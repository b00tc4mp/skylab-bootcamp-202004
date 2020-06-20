import React, { useState, useEffect, useCallback } from 'react'
import { Line } from 'react-chartjs-2'
import { addProduct } from 'gym-client-logic'
import './ProductDatails.sass'
import Feedback from './Feedback'

function ProductDetails({ token, prices, underlyings, item, expanded }) {
    const [futureChartData, setFutureChartData] = useState()
    const [underlyingChartData, setUnderlyingChartData] = useState()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()

    const futurePrice = prices.map(({ price }) => price)
    const futureDate = prices.map(({ date }) => date)

    const underlyingPrice = underlyings.map(({ price }) => price)
    const underlyingDate = underlyings.map(({ date }) => date)

    const Chart = () => {

        setFutureChartData({
            labels: futureDate,
            datasets: [
                {
                    label: `${item.ticker}`,
                    lineTension: 0.5,
                    backgroundColor: "rgba(84,192,176,0.2)",
                    borderColor: "rgba(84,192,176,1)",
                    data: futurePrice,
                },
            ],
        })

        setUnderlyingChartData({
            labels: underlyingDate,
            datasets: [
                {
                    label: `${item.ticker}`,
                    lineTension: 0.5,
                    backgroundColor: "rgba(241,120,113,0.2)",
                    borderColor: "rgba(241,120,113,1)",
                    data: underlyingPrice
                }]
        })
    }

    useEffect(() => {
        Chart()
    }, [])

    const onTrade = event => {
        event.preventDefault()

        let { quantity, side } = event.target

        quantity = Number(quantity.value)
        side = side.value

        try {
            addProduct(token, item._id, item.priceId, side, quantity)
                .then(() => setSuccess('trade has been added to the portfolio'))
                .catch(({ message }) => setError(message))
        } catch ({ message }) {
            setError(message)
        }
    }

    return <section className='details'>
        {!expanded && item.productType === 'future' &&
            <section>
                <section className='details__data'>
                    <section className='details__price'>
                        <p>{item.productType}</p>
                        <h1 className='details__ticker'>{item.ticker}</h1>
                        <h2>{`${item.price}€`}</h2>
                    </section>
                    <section className="details__item">
                        <p>{item.settlementDate}</p>
                        <p>{`Contract size: ${item.contractSize}`}</p>
                        <p>{item.exchange}</p>
                        <p>{item.sector}</p>
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
                                text: 'Historic future prices',
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
                                        stepSize: 0.5,
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
                        height={250}
                    />
                </section>
            </section>
        }
        {!expanded && item.productType === 'option' &&
            <section>
                <section className='details__data'>
                    <section className='details__price'>
                        <p>{item.productType}</p>
                        <h1 className='details__ticker'> {item.ticker}</h1>
                        <h2>{`${item.price}€`}</h2>
                    </section>
                    <section className="details__item">
                        <p>{item.type.side}</p>
                        <p>{`${item.type.strike}€`}</p>
                        <p>{item.settlementDate}</p>
                        <p>{`Contract size: ${item.contractSize}`}</p>
                        <p>{item.exchange}</p>
                        <p>{item.sector}</p>
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
        <section className="details__underlying">
            <Line
                data={underlyingChartData}
                options={{
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
                                stepSize: 0.5,
                                suggestedMin: Math.min(...futurePrice),
                                suggestedMax: Math.max(...futurePrice),
                                callback: function (value) {
                                    return value + '€'
                                }
                            },
                        }]
                    }
                }}
                height={250}
            />
        </section>

    </section>
}

export default ProductDetails