require('../utils/polyfills/string')
const{mongo}= require("../misc-api/data")
const{ObjectId}=mongo
module.exports=(productId)=>{
    String.validate.notVoid(productId)
    return mongo.connect()
        .then(connection=>{
            const products=connection.db().collection("products")
            return products.findOne({_id:ObjectId(productId)})
        })
        .then(product=>{
            delete product._id
            return product
        })
}