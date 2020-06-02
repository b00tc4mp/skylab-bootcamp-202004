const {mongo} =require("../misc-api/data")
require('../utils/polyfills/string')
const {UnexistenceError} = require('../errors');
const{ObjectId}=mongo

module.exports = (productId) => {
    String.validate.notVoid(productId)
    let products

    return mongo.connect()
        .then(connection=>{
            products=connection.db().collection("products")
            return products.findOne({_id:ObjectId(productId)})
        })
        .then(product=>{
            if(!product) throw new UnexistenceError(`product with _id ${productId} does not exist`)
            products.deleteOne({_id:product._id})
            return `Deleted product ${productId}`
        })
}