import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'


function ProductDetails({ prices, underlyings }) {
    const [futureChartData, setFutureChartData] = useState()
    const [underlyingChartData, setUnderlyingChartData] = useState()

    const Chart = () => {
        const futurePrice = prices.map(({ price }) => price)
        const futureDate = prices.map(({ date }) => date)

        const underlyingPrice = underlyings.map(({ price }) => price)
        const underlyingDate = underlyings.map(({ date }) => date)

        setFutureChartData({
            labels: futureDate,
            datasets: [
                {
                    lineTension: 0.5,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    data: futurePrice
                }],
            options: {
                title: {
                    display: true,
                    text: 'Historic future prices',
                    fontSize: 20
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 0.1
                        }
                    }]
                }
            }

        })

        setUnderlyingChartData({
            labels: underlyingDate,
            datasets: [
                {
                    lineTension: 0.5,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    data: underlyingPrice
                }],
            options: {
                title: {
                    display: true,
                    text: 'Historic prices of future underlying',
                    fontSize: 20
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            stepSize: 0.1
                        }
                    }]
                }
            }
        })

    }

    useEffect(() => {
        Chart()
    }, [])

    return <section>
        <h1>Hola</h1>
        <section className="historic-prices">
            <Line
                data={futureChartData}
            />
        </section>
        <section className="historic-underlyings-prices">
            <Line
                data={underlyingChartData}
            />
        </section>
    </section>
}

export default ProductDetails