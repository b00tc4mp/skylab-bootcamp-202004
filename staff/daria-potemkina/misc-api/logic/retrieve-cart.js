require('../utils/polyfills/string')

const { mongo } = require('../data')
const { ObjectId } = mongo
const { UnexistenceError } = require('../errors')

module.exports = userId => {
    String.validate.notVoid(userId)

    return mongo.connect()
        .then(connection => {
            const carts = connection.db().collection('carts')

            return carts.findOne({user: userId})
        })
        .then(cart => {
            if(!cart) throw new UnexistenceError(`cart does not exist`)

            delete cart._id
            delete cart.user

            return cart
        })
}