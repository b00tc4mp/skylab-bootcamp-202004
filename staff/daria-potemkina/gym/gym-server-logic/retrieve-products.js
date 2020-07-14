/**
 * Retrieve products
 * 
 * @returns {Promise <Array>} the products available if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the product does not exist
 */


require('gym-commons/polyfills/string')
const { models: { Product } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = () => {
    let now = new Date();
    now.setHours(now.getHours() + 2);

    return (async () => {
        const products = await Product.find({settlementDate: {$gt: now }}).sort({ settlementDate: 1 }).lean()
     
        if (!products.length) throw new UnexistenceError('there are no products to show')

        products.forEach(item => {
            delete item.__v
        })

        return products
    })()
}