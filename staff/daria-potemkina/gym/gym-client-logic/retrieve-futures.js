/**
 * Retrive futures
 * 
 * @returns {Promise<Array>} The array of futures if it resolves, an error if it rejects.
 * 
 * @throws {Error} If the product or price do not exist.
 * 
 */

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

                futures = Promise.all(futures.map((item) => {
                    return call('GET', `${this.API_URL}/price?productId=${item._id.toString()}`,
                        undefined,
                        undefined)
                        .then(({ status, body }) => {
                            if (status === 200) {
                                const prices = JSON.parse(body)
                                const [{ price, _id: priceId }] = prices

                                item.settlementDate = moment(item.settlementDate).format('MMMM YY')
                                
                                item.price = price
                                item.priceId = priceId
                                
                                return item

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