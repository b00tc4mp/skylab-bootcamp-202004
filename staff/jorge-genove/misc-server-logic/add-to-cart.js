
require('../misc-commons/polyfills/string')
const { mongo } = require('misc-data')
const {ObjectId} = mongo

module.exports = (userId, productId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
   
    
    let carts
    return mongo.connect()
        .then(connection => {
            carts = connection.db().collection('carts')

            return carts.findOne({ userId })
        })
        .then(cart => {
            if (!cart) carts.insertOne({ products: [productId], userId })
            
            else carts.update({ _id: ObjectId(cart._id) }, {$push: {products : productId}})

            return cart._id.toString()
        })

}