require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User, Lesson, ProductSelection } } = require('7-potencias-data')

module.exports = (userId, productId, quantity) => {
  String.validate.notVoid(userId)
  String.validate.notVoid(productId)
  Number.validate.positive(quantity)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const lesson = await Lesson.findById(productId).lean()

    if (!lesson) throw new UnexistenceError(`product with id ${productId} does not exist`)

    const { cart } = user

    const index = cart.findIndex(item => item.product._id.toString() === productId)

    if (quantity === 0) {
      if (index < 0) throw new UnexistenceError(`product selection with id ${productId} does not exist in cart for user with id ${userId}`)

      cart.splice(index, 1)
    } else {
      if (index < 0) {
        const productSelection = new ProductSelection({ product: productId, quantity })

        cart.push(productSelection)
      } else cart[index].quantity = quantity
    }
    await user.save()
    await user.populate('cart.product').execPopulate()
    return user.cart
  })()
}
