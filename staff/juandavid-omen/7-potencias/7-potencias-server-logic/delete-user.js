require('7-potencias-commons/polyfills/string')
const { models: { User } } = require('7-potencias-data')
const { errors: { UnexistenceError } } = require('7-potencias-commons')

module.exports = userId => {
  String.validate.notVoid(userId)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    return User.deleteOne({ _id: userId })
  })()
}
