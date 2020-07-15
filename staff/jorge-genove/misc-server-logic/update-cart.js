require('misc-commons/polyfills/string')
require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('misc-commons')
const { mongoose, model : {User, Product} } = require('misc-data')
const { ObjectId } = mongoose

module.exports = (userId, productId, quantity) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
    Number.validate.positive(quantity)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            return Product.findById(productId)
                .then(product => {
                    if (!product) throw new UnexistenceError(`product with id ${productId} does not exist`)
                    const cart = user.cart
                    const index = cart.findIndex(item => item.product.toString() === productId)

                    if (quantity === 0) {
                        if (index < 0) throw new UnexistenceError(`product with id ${productId} does not exist in cart for user with id ${userId}`)

                        cart.splice(index, 1)
                    } else {
                        let product

                        if (index < 0) {
                            product = { product: productId }

                            cart.push(product)
                        } else product = cart[index]

                        product.quantity = quantity
                    }
                    return User.findByIdAndUpdate(userId,{$addToSet:{cart}})
                })
        })
        .then(() => { })
}