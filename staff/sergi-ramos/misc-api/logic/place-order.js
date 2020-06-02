require('misc-commons/polyfills/string')
const { mongo } = require('../data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('misc-commons/')

module.exports = (userId) => {

    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {

            const db = connection.db()

            const users = db.collection('users')

            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    const { order = [], cart } = user
                    if(cart.length > 0 ){
                        cart.push(ObjectId())
                        order.push(cart)
                    }else{
                        throw new UnexistenceError('cart is empty')
                    }
                    return users.updateOne({ _id: ObjectId(userId) }, { $set: { cart: [], order } })
                })
                .then(() => {})
        })
}