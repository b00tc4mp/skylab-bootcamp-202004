require('7-potencias-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User } } = require('7-potencias-data')

module.exports = userId => {
  String.validate.notVoid(userId)

  return (async () => {
    const user = await User.findById(userId).lean()

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    delete user._id
    delete user.__v

    return user
  })()
}
