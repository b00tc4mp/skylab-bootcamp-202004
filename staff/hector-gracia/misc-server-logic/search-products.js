require('../utils/polyfills/string')
const{mongo}= require("../misc-api/data")
const{ObjectId}=mongo
module.exports=(query)=>{
    String.validate.notVoid(query)
    return mongo.connect()
        .then(connection=>{
            const products=connection.db().collection("products")
            return products.find({})
        })
        .then(product=>{
            delete product._id
            return product
        })
}