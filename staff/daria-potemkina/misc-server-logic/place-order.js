require('misc-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('misc-commons')
const { models: { User, Order, Product } } = require('misc-data')


module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId).populate('cart.product')
        .then(_user => {
            if (!_user) throw new UnexistenceError(`user with id ${userId} does not exist`)
            
            const { cart } = _user

            if (cart.length === 0) throw new UnexistenceError(`cart is empty`)

            for (let i in cart) {
                return Product.findById(cart[i].product)

                .then(_product => {
                    if(!_product) throw new UnexistenceError(`product does not exist`)
                })
            }

            const totalPrice = _user.cart.reduce((accum, item) => accum + item.product.price * item.quantity, 0)
            
            const _order = {  user: userId, products: _user.cart, totalPrice, date: new Date }

            return Order.create(_order)

                .then(() => {
                    _user.cart = []

                    return _user.save()

                })
        })
        .then(() => { })
}
