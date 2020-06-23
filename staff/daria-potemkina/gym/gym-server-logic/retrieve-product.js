require('gym-commons/polyfills/string')
const { mongoose, models: { Product } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose

module.exports = (productId) => {
    String.validate.notVoid(productId)

    return (async () => {

        const product = await Product.findById(ObjectId(productId)).lean()

        if (!product) throw new UnexistenceError(`the product con ${productId} is not exist`)

        delete product.__v

        return product
    })()
}