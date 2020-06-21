/**
 * Retrieve underlying prices
 * 
 * @param {string} ticker the product ticker
 * 
 * @returns {Promise <Array>} the underlying prices if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the product does not exist
 * @throws {TypeError} if the parameter does not match the corresponding type
 * @throws {Error} if the parameter is empty or blank
 */

require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { models: { Underlying, Price } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = (ticker) => {
    String.validate.notVoid(ticker)

    return (async () => {
        const product = await Underlying.findOne({ ticker: ticker })

        if (!product) throw new UnexistenceError(`product with ticker ${ticker} is not exist`)

        const { _id } = product

        const prices = await Price.find({ product: _id }).lean()

        if (!prices.length) throw new UnexistenceError('price not found')

        for (let i in prices) {
            prices[i].date = new Date (prices[i].date)
            delete prices[i]._id
            delete prices[i].__v
        }

        prices.sort( (a, b) => {
            return (b.date - a.date)
        })

        return prices
    })()
}