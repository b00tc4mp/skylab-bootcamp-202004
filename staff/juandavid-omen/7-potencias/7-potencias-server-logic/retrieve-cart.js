require('7-potencias-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User } } = require('7-potencias-data')

module.exports = userId => {
  String.validate.notVoid(userId)

  return (async () => {
    const user = await User.findById(userId).populate('cart.product')

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    return user.cart
  })()
}
