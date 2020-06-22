import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation, retrieveUserPortfolio } from 'gym-client-logic'
import { Pie } from 'react-chartjs-2'
import Feedback from './Feedback'
import Trades from './Trades'
import Spinner from './Spinner'
import './Feedback.sass'
import './Portfolio.sass'

export default function () {
    const [error, setError] = useState()
    const [allocation, setAllocation] = useState({})
    const [typeData, setTypeData] = useState({})
    const [marketData, setMarketData] = useState({})
    const [sectorData, setSectorData] = useState({})
    const [contracts, setContracts] = useState()
    const [trade, setTrade] = useState()
    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            (async() => {
                try {
                    retrieveUserPortfolio()
                        .then(contracts => {
                            setContracts(contracts)
                            setLoading(false)})
                        .catch(error => setError(error.message))
                } catch (error) {
                    setLoading(false)
                    setError(error.message)
                }
            })()
        }, 1000)
        return() => clearTimeout(timer)
    }, [contracts])

    useEffect(() => {
        try {
            retrieveUserAssetAllocation()
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
                .catch(error => {
                    setError(error.message)
                    setLoading(false)})
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }, [allocation])

    const handleDetails = (event, id, trades) => {
        event.preventDefault()
        setTrade({ id, trades })

        if (details === true) setDetails(false)
        else setDetails(true)
    }

    return <section className='portfolio'>
        {loading && <Spinner />}
        {allocation && typeData && contracts &&
            <section>
                <h1 className="portfolio__title">Portfolio</h1>
                <section className="portfolio__data">
                    <section>
                        <ul className="portfolio__trades">
                            {contracts.map(({ _id, product: { ticker, productType, settlementDate }, trades}) =>
                                <li key={_id} className="portfolio__item">
                                    <p className="portfolio__ticker">{ticker}</p>
                                    <p className="portfolio__type">{productType}</p>
                                    <p className="portfolio__settlementDate">{settlementDate}</p>
                                    <button className="portfolio__button" onClick={event => handleDetails(event, _id, trades)}>More</button>
                                    <div className="portfolio__trades-item">
                                        {trade && trade.id === _id && details === true && <Trades trades={trade} />}
                                    </div>
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
        {error && !loading && <Feedback message={error} level="error" />}
    </section>
}