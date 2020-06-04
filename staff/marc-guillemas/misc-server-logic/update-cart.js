require('misc-commons/polyfills/string')
// require('misc-commons/polyfills/json')
require('misc-commons/polyfills/number')
const {  errors: { UnexistenceError }} = require('misc-commons')

const {model: {User, Order,Product}, mongoose} = require('misc-data')


module.exports = (userId, productId, quantity) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(productId)
    Number.validate.positive(quantity)
debugger
    return User.findById( userId )
        .then(user => {
debugger
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            const { cart = [] } = user
        
            const index = cart.findIndex(item => item.product.toString() === productId)
            debugger
            if (quantity === 0) {
                if (index < 0) throw new UnexistenceError(`product with id ${productId} does not exist in cart for user with id ${userId}`)

                cart.splice(index, 1)
            } else {
                let product

                if (index < 0) {
                    product = {product: productId}

                    cart.push(product)
                } else product = cart[index]

                
                //new prodct
                //
                product.quantity = quantity
            }
            
            return User.findByIdAndUpdate(userId, { $set: { cart } })
        })
        .then(() => { })
        
}