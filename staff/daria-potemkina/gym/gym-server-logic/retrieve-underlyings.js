require('gym-commons/polyfills/string')
require('gym-commons/polyfills/number')
const { mongoose, models: { Underlying, Price } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose


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