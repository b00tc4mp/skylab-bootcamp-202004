/**
 * Return the product list due search parameters
 * 
 * @param {string} type The type of product.
 * @param {string} sector The sector of the product issuer.
 * @param {string} ticker The product ticker.
 * @param {string} market The market of the product.
 * 
 * @returns {Promise<Array>} The list of products if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters if exists does not match the required format.
 * @throws {Error} If any of the parameters if exists is empty or blank.
 * 
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')
const moment = require('moment')

module.exports = function (type, sector, ticker, market) {
    if (typeof type !== "undefined")
        String.validate.notVoid(type)
    if (typeof sector !== "undefined")
        String.validate.notVoid(sector)
    if (typeof ticker !== "undefined")
        String.validate.notVoid(ticker)
    if (typeof market !== "undefined")
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