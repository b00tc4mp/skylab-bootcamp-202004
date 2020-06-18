import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation, retrieveUserPortfolio } from 'gym-client-logic'
import { Pie } from 'react-chartjs-2'
import Feedback from './Feedback'
import Trades from './Trades'
import './Feedback.sass'

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
                                backgroundColor: ['#54c0b0', '#54a7da']
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
                            backgroundColor: ['#54c0b0', '#54a7da']
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
                            backgroundColor: ['#54c0b0', '#54a7da', '#f45c66']
                        }
                        ]
                    })
                })
                .then(() => { })
                .catch(error => setError(error.message))
        } catch (error) {
            setError(error.message)
        }
    }, [token, allocation])

    const handleDetails = (event, id, trades) => {
        event.preventDefault()
        setTrade({ id, trades })

        if(details === true) setDetails(false)
        else setDetails(true)
    }

    return <section>
        {allocation && typeData && contracts &&
            <section>
                <h1>Portfolio</h1>
                <section className="trades">
                    <ul>
                        {contracts.map(({ _id, product: { ticker, productType, settlementDate }, trades }) =>
                            <li>
                                <p>{ticker}</p>
                                <p>{productType}</p>
                                <p>{settlementDate}</p>
                                <button onClick={event => handleDetails(event, _id, trades)}>Details</button>
                                {trade && trade.id === _id && details===true && <Trades trades={trade} />}
                            </li>
                        )}</ul>
                </section>
                <section>
                    <Pie
                        data={typeData}
                    />
                    <Pie
                        data={marketData}
                    />
                    <Pie
                        data={sectorData}
                    />
                </section>
            </section>
        }
            {error && <Feedback message="error" level="error" />}
    </section>
}