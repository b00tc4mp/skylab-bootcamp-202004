require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function (type, sector, ticker, market) {
    if (type !== undefined)
        String.validate.notVoid(type)
    if (sector !== undefined)
        String.validate.notVoid(sector)
    if (ticker !== undefined)
        String.validate.notVoid(ticker)
    if (market !== undefined)
        String.validate.notVoid(market)

    return call('GET', `${this.API_URL}/products?${type && `type=${type}`}&${sector && `sector=${sector}`}&${ticker && `ticker=${ticker}`}&${market && `market=${market}`}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                let results = JSON.parse(body)

                results.sort((a, b) => {
                    return (a.settlementDate - b.settlementDate)
                })

                results = Promise.all(results.map( item => {
                    return call('GET', `${this.API_URL}/price?productId=${item._id.toString()}`,
                        undefined,
                        undefined)
                        .then(({ status, body }) => {
                            if (status === 200) {
                                const prices = JSON.parse(body)
                                const [{ price, _id }] = prices

                                item.settlementDate = moment(item.settlementDate).format('MMMM YY')
                                item.price = price
                                item.priceId = _id

                                return item

                            } else {
                                const { error } = JSON.parse(body)

                                throw new Error(error)
                            }
                        })
                }))
                return results
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)