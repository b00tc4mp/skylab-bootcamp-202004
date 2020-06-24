import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation, retrieveUserPortfolio } from 'gym-client-logic'
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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
                            })
                        .catch(error => setError(error.message))
                } catch (error) {
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
                    let allocationByType = Object.values(allocation.type)
                    const totalAmountType = allocationByType.reduce((acc, amount) => acc + amount, 0 )
                    allocationByType = allocationByType.map(item => (item * 100 / totalAmountType).toFixed(2))

                    return setTypeData({
                        labels: Object.keys(allocation.type),
                        datasets: [
                            {
                                label: 'Allocation by type',
                                data: allocationByType,
                                backgroundColor: ['#54727D', '#D39391']
                            }
                        ]
                    })
                })
                .then(() => {
                    let allocationByExchange = Object.values(allocation.exchange)
                    const totalAmountExchange = allocationByExchange.reduce((acc, amount) => acc + amount, 0 )
                    allocationByExchange = allocationByExchange.map(item => (item * 100 / totalAmountExchange).toFixed(2))

                    return setMarketData({
                        labels: Object.keys(allocation.exchange),
                        datasets: [{
                            label: 'Allocation by exchange',
                            data: allocationByExchange,
                            backgroundColor: ['#54727D', '#D39391']
                        }
                        ]
                    })
                })
                .then(() => {
                    let allocationBySector = Object.values(allocation.sector)
                    const totalAmountSector = allocationBySector.reduce((acc, amount) => acc + amount, 0 )
                    allocationBySector = allocationBySector.map(item => (item * 100 / totalAmountSector).toFixed(2))

                    return setSectorData({
                        labels: Object.keys(allocation.sector),
                        datasets: [{
                            label: 'Allocation by exchange',
                            data: allocationBySector,
                            backgroundColor: ['#54727D', '#D39391', '#30727D', '#30727D']
                        }
                        ]
                    })
                })
                .then(() => {
                    setError(undefined)
                    setLoading(false)
                })
                .catch(error => {
                    setError(error.message)
                    setLoading(false)
                    })
        } catch (error) {
            setError(error.message)
        }
    }, [allocation])

    const handleDetails = (event, id, trades, productType, type) => {
        event.preventDefault()
        setTrade({ id, trades, productType, type })

        if (details === true) setDetails(false)
        else setDetails(true)
    }

    return <section className='portfolio'>
        {loading && <Spinner />}
        {allocation && typeData && contracts &&
            <section className="portfolio__description">
                <h1 className="portfolio__title">Portfolio</h1>
                <section className="portfolio__data">
                    <section>
                        <ul className="portfolio__trades">
                            {contracts.map(({ _id, product: { ticker, productType, settlementDate, type }, trades}) =>
                                <li key={_id} className="portfolio__item">
                                    <p className="portfolio__ticker">{ticker}</p>
                                    <p className="portfolio__type">{productType}</p>
                                    <p className="portfolio__settlementDate">{settlementDate}</p>
                                    <button className="portfolio__button" onClick={event => handleDetails(event, _id, trades, productType, type)}> <FontAwesomeIcon size="sm" icon={faAngleDown}/> </button>
                                    <div className="portfolio__trades-item">
                                        {trade && trade.id === _id && details === true && <Trades trades={trade} />}
                                    </div>
                                </li>
                            )}</ul>
                    </section>
                </section>
                <section className="portfolio__grafs">
                    <div>
                    <Pie
                        data={typeData}
                        options={{
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            title: {
                                display: true,
                                text: 'Product type',
                                fontSize: 15
                            }
                        }}
                    />
                    </div>
                    <div>
                    <Pie
                        data={marketData}
                        options={{
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            title: {
                                display: true,
                                text: 'Exchange',
                                fontSize: 15
                            }
                        }}
                    />
                    </div>
                    <div>
                    <Pie
                        data={sectorData}
                        options={{
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            title: {
                                display: true,
                                text: 'Sector',
                                fontSize: 15
                            }
                        }}
                    />
                    </div>
                </section>
            </section>
        }
        {error && !loading && <Feedback message={error} level="error" />}
    </section>
}