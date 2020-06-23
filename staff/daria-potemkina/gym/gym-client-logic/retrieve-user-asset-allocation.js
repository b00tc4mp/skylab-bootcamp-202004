/**
 * Retrieve the asset allocation of the user portfolio
 * 
 * @returns {Promise<Object>} The asset allocation by sector, market and product type if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If the parameter does not match the corresponding type.
 * @throws {Error} If the token is empty.
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function () {
    const { token } = context.storage

    return call('GET', `${this.API_URL}/users/trades`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                const results = JSON.parse(body)

                const allocation = {
                    exchange: {},
                    type: {},
                    sector: {}
                }

                for (let item of results) {
                    const { product, trades } = item

                    for (let key in product) {
                        if (key === 'exchange') {
                            // allocation.exchange[product[key]] ?
                            //     allocation.exchange[product[key]] += trades.map(({ quantity }) => quantity).reduce((acc, currentValue) => acc += currentValue, 0) * product.contractSize
                            //     :
                                allocation.exchange[product[key]] = trades.map(({ quantity }) => quantity).reduce((acc, currentValue) => acc += currentValue, 0) * product.contractSize

                        }
                        if (key === 'productType') {
                            // allocation.type[product[key]] ?
                            //     allocation.type[product[key]] += trades.map(({ quantity }) => quantity).reduce((acc, currentValue) => acc += currentValue, 0) * product.contractSize
                            //     :
                                allocation.type[product[key]] = trades.map(({ quantity }) => quantity).reduce((acc, currentValue) => acc += currentValue, 0) * product.contractSize

                        }
                        if (key === 'sector') {
                            // allocation.sector[product[key]] ?
                            //     allocation.sector[product[key]] += trades.map(({ quantity }) => quantity).reduce((acc, currentValue) => acc += currentValue, 0) * product.contractSize
                            //     :
                                allocation.sector[product[key]] = trades.map(({ quantity }) => quantity).reduce((acc, currentValue) => acc += currentValue, 0) * product.contractSize

                        }
                    }
                }
                return allocation
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)