require('facturator-commons/polyfills/string')

const { mongoose:{ObjectId},models: { Product } } = require('facturator-data')
const {  errors: { UnexistenceError } } = require('facturator-commons')

module.exports = (productId) => {
    String.validate.notVoid(productId)

    return (async () => {
        product= await Product.findOne({ _id:ObjectId(productId)},{__v:0}).lean()
        if(!product) throw new UnexistenceError(`product with id ${productId} does not exist`)
        product.id= product._id.toString()
        delete product._id
        return product
    })()
}