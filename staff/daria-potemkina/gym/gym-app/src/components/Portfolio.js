import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation, retrieveUserPortfolio } from 'gym-client-logic'
import { Pie } from 'react-chartjs-2'
import Feedback from './Feedback'
import Trades from './Trades'
import './Feedback.sass'
import './Portfolio.sass'

export default function ({ token }) {
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
                                backgroundColor: ['#54c0b0', '#f45c66']
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
                            backgroundColor: ['#54c0b0', '#f45c66']
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
                            backgroundColor: ['#54c0b0', '#f45c66', '#54a7da', "#E94F8F"]
                        }
                        ]
                    })
                })
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
                    {/* <ul className="portfolio__header">
                        <li className="item1">ticker</li>
                        <li className="item2">type</li>
                        <li className="item3">Expiry</li>
                        <li className="item4">    </li>
                    </ul> */}
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
                        height={180}
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
                        height={180}
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
                        height={180}
                    />
                </section>
            </section>
        }
        {error && <Feedback message={error} />}
    </section>
}