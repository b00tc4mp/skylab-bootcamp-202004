import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation, retrieveUserPortfolio } from 'gym-client-logic'
import { Pie } from 'react-chartjs-2'
import Feedback from './Feedback'
import Trades from './Trades'
import './Feedback.sass'
import './Portfolio.sass'
import { Link } from 'react-router-dom'

export default function ({ token, history }) {
    const [error, setError] = useState()
    const [allocation, setAllocation] = useState({})
    const [typeData, setTypeData] = useState({})
    const [marketData, setMarketData] = useState({})
    const [sectorData, setSectorData] = useState({})
    const [contracts, setContracts] = useState()
    const [trade, setTrade] = useState()
    const [details, setDetails] = useState()

    useEffect(() => {
        try {
            retrieveUserPortfolio(token)
                .then(contracts => setContracts(contracts))
                .catch(error => setError(error.message))
        } catch (error) {
            setError(error.message)
        }
    }, [token])

    useEffect(() => {
        try {
            retrieveUserAssetAllocation(token)
                .then(async (_allocation) => await setAllocation(_allocation))
                .then(() => {
                    return setTypeData({
                        labels: Object.keys(allocation.type),
                        datasets: [
                            {
                                label: 'Allocation for type',
                                data: Object.values(allocation.type),
                                backgroundColor: ['#54727D', '#D39391']
                            }
                        ]
                    })
                })
                .then(() => {
                    return setMarketData({
                        labels: Object.keys(allocation.exchange),
                        datasets: [{
                            label: 'Allocation for exchange',
                            data: Object.values(allocation.exchange),
                            backgroundColor: ['#54727D', '#D39391']
                        }
                        ]
                    })
                })
                .then(() => {
                    return setSectorData({
                        labels: Object.keys(allocation.sector),
                        datasets: [{
                            label: 'Allocation for exchange',
                            data: Object.values(allocation.sector),
                            backgroundColor: ['#54727D', '#D39391', '#30727D', "#A56072"]
                        }
                        ]
                    })
                })
                .then(() => setError(undefined))
                .catch(error => setError(error.message))
        } catch (error) {
            setError(error.message)
        }
    }, [token, allocation])

    const handleDetails = (event, id, trades) => {
        event.preventDefault()
        setTrade({ id, trades })

        if (details === true) setDetails(false)
        else setDetails(true)
    }

    return <section className='portfolio'>
        {allocation && typeData && contracts &&
            <section>
                <h1 className="portfolio__title">Portfolio</h1>
                <section className="portfolio__data">
                    <section>
                        <ul className="portfolio__trades">
                            {contracts.map(({ _id, product: { ticker, productType, settlementDate }, trades }) =>
                                <li className="portfolio__item">
                                    <p>{ticker}</p>
                                    <p className="portfolio__type">{productType}</p>
                                    <p>{settlementDate}</p>
                                    <button className="portfolio__button" onClick={event => handleDetails(event, _id, trades)}>More</button>
                                    {trade && trade.id === _id && details === true && <Trades trades={trade} />}
                                </li>
                            )}</ul>
                    </section>
                </section>
                <section>
                    <Pie
                        data={typeData}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            title: {
                                display: true,
                                text: 'Product type',
                                fontSize: 15
                            }
                        }}
                    />
                    <Pie
                        data={marketData}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            title: {
                                display: true,
                                text: 'Exchange',
                                fontSize: 15
                            }
                        }}
                    />
                    <Pie
                        data={sectorData}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            title: {
                                display: true,
                                text: 'Sector',
                                fontSize: 15
                            }
                        }}
                    />
                </section>
            </section>
        }
        {error && <Feedback message={error} />}
    </section>
}