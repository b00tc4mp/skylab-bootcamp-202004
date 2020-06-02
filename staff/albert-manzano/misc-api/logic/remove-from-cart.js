require('../utils/polyfills/string')
const { mongo } = require('../data')

module.exports = (userId,product) => {
    String.validate.notVoid(userId)
    if (typeof product !== 'object') throw new TypeError(`${newInfo} is not an object`)
    
    return mongo.connect()
        .then(connection => {
        
            const carts = connection.db().collection('carts')
            return carts.updateOne( { _id : ObjectId ( userId ) } , { $pull: { product:{productId} }} )
        })
}