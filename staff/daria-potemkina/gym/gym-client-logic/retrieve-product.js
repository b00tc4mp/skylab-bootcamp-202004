/**
 * Retrive product
 * 
 * @returns {Promise<Object>} The product if it resolves, an error if it rejects.
 * 
 * @throws {Error} If the product or price does not exist.
 * 
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function (productId) {
    String.validate.notVoid(productId)

    return call('GET', `${this.API_URL}/product/${productId}`,
        undefined,
        undefined)
        .then(({ status, body }) => {
            if (status === 200) {
                let product = JSON.parse(body)

                return call('GET', `${this.API_URL}/price?productId=${productId}`,
                    undefined,
                    undefined)

                    .then(({ status, body }) => {
                        if (status === 200) {
                            const prices = JSON.parse(body)
                            const [{ price, _id: priceId }] = prices

                            product.settlementDate = moment(product.settlementDate).format('MMMM YY')

                            product.price = price
                            product.priceId = priceId

                            return product
                        } else {
                            const { error } = JSON.parse(body)

                            throw new Error(error)
                        }
                    })
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)