require('7-potencias-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User, Order } } = require('7-potencias-data')

module.exports = userId => {
  String.validate.notVoid(userId)

  return (async () => {
    const user = await User.findById(userId).populate('cart.product')

    if (!user) throw new UnexistenceError('user not exists')

    const { cart = [], orders = [] } = user

    if (!cart.length) throw new UnexistenceError('Cart is empty')

    const amount = user.cart.reduce((accumulator, item) => accumulator + item.product.price, 0)

    orders.push(new Order({ products: user.cart, amount, date: new Date() }))

    await User.findByIdAndUpdate(userId, { $set: { cart: [], orders } })
  })()
}
