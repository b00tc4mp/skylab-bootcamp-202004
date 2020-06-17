import React, { useEffect, useState } from 'react'
import { retrieveUserAssetAllocation } from 'gym-client-logic'
import { Pie } from 'react-chartjs-2'
import Feedback from './Feedback'
import './Feedback.sass'

export default function ({ token }) {
    const [error, setError] = useState()
    const [allocation, setAllocation] = useState({})
    const [typeData, setTypeData] = useState({})
    const [marketData, setMarketData] = useState({})
    const [sectorData, setSectorData] = useState({}) 

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
                                backgroundColor: ['#ff6384', '#36a2eb']
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
                            backgroundColor: ['#ff6384', '#36a2eb']
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
                            backgroundColor: ['#ff6384', '#36a2eb']
                        }
                    ]
                    })
                })
                .then(() => { })
                .catch(error => setError(error.message))
        } catch (error) {
            setError(error.message)
        }
    }, [allocation])

    return <section>
        {allocation && typeData &&
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
                <h1>Portfolio</h1>
                <p>{allocation.options}</p>
                <p>{allocation.futures}</p>
                <p>{allocation.meff}</p>
            </section>
        }
        {error && <Feedback message={error} level="error" />}
    </section>
}