/**
 * Search products
 * 
 * @param {string} type the type of product
 * @param {string} sector the sector of product
 * @param {string} ticker the ticker of product
 * @param {string} market the market of product
 * 
 * @returns {Promise <Array>} the search results if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the product does not exist
 * @throws {TypeError} if any of the parameters if exist does not match the corresponding type
 * @throws {Error} if any of the parameters if exist is empty or blank
 */


require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { models: { Product } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = (type, sector, ticker, market) => {
    if (type !== undefined)
        String.validate.notVoid(type)
    if (sector !== undefined)
        String.validate.notVoid(sector)
    if (ticker !== undefined)
        String.validate.notVoid(ticker)
    if (market !== undefined)
        String.validate.notVoid(market)

    return (async () => {
        const conditions = {}

        if (type) conditions.productType = type
        if (sector) conditions.sector = sector
        if (ticker) conditions.ticker = ticker
        if (market) conditions.exchange = market


        const results =  await Product.find(conditions).where('settlementDate').gt(new Date()).lean()

        if (!results.length) throw new UnexistenceError('no results')

        for (let i in results) {
            delete results[i].__v
        }

        return results
    })()
}