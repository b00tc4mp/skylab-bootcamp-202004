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

        if(type) conditions.productType = type
        if(sector) conditions.sector = sector
        if(ticker) conditions.ticker = ticker
        if(market) conditions.exchange = market

        const results = await Product.find(conditions).lean()

        if(!results.length) throw new UnexistenceError('no results')

        for (let i in results) {
            delete results[i]._id
            delete results[i].__v
        }

        return results
    })()
}