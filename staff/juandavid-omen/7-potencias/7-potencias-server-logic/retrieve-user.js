require('7-potencias-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('7-potencias-data')

module.exports = userId => {
  String.validate.notVoid(userId)

  return (async () => {
    const user = await User.findOne({ _id: ObjectId(userId) }).lean()

    if (!user) throw new Error(`user with id ${userId} does not exist`)

    delete user._id

    return user
  })()
}
