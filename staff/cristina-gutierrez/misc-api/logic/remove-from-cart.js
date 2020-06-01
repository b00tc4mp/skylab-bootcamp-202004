require('../utils/polyfills/string')
require('../utils/polyfills/json')
require('../utils/polyfills/number') // FALTA CREAR EL POLYFILL NUMBER Y PONER EL VALUE ERROR EN EL INDEX DE ERRORES, V6
const { UnexistenceError } = require('../errors')
const { mongo } = require('../data')
const { ObjectId } = mongo

module.exports = (userId, productId, quantity = 0) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(ProductId)
    Number.validate(quantity)

    //ACABAR REMOVE FROM CART

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ _id: ObjectId(userId) })
                .then(user => {
                    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

                    const { cart = [] } = user

                    const item = cart.find(item => item.product.toString() === productId)

                    if(item)
                        item.quantity++

                    else
                        cart.push ({
                            product: ObjectId(productId),
                            quantity: 1
                        })

                    return users.updateOne({ _id: ObjectId(userId) }, { $set: {cart } })
                })
                .then (() => { })
        })
}