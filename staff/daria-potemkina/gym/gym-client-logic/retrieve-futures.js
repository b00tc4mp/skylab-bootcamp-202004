require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function () {
    return call('GET', `${this.API_URL}/products-all`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                const results = JSON.parse(body)

                let futures = results.filter(item => item.productType === 'future')

                futures = Promise.all(futures.map(({ _id, ticker, settlementDate }) => {
                    return call('GET', `${this.API_URL}/price?productId=${_id.toString()}`,
                        undefined,
                        undefined)
                        .then(({ status, body }) => {
                            if (status === 200) {
                                const prices = JSON.parse(body)
                                const [{ price }] = prices

                                settlementDate = moment(settlementDate).format('MMMM YY')

                                return { ticker, settlementDate, price }

                            } else {
                                const { error } = JSON.parse(body)

                                throw new Error(error)
                            }
                        })
                }))
                return futures

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)