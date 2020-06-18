require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User, ProductSelection } } = require('7-potencias-data')

module.exports = (userId, productSelectionId, quantity) => {
  String.validate.notVoid(userId)
  String.validate.notVoid(productSelectionId)
  Number.validate.positive(quantity)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const productSelection = await ProductSelection.findById(productSelectionId).lean()

    if (!productSelection) throw new UnexistenceError(`product selection with id ${productSelectionId} does not exist`)

    const { cart = [] } = user

    const index = cart.findIndex(item => item._id.toString() === productSelectionId)

    if (quantity === 0) {
      if (index < 0) throw new UnexistenceError(`product selection with id ${productSelectionId} does not exist in cart for user with id ${userId}`)

      cart.splice(index, 1)
    } else {
      cart.push(productSelection)
    }

    return user.save({ userId, $set: { cart } })
  })()
}
