require('7-potencias-commons/polyfills/string')
const { models: { User } } = require('7-potencias-data')
const user = require('7-potencias-data/models/schemas/user')

module.exports = query => {
  String.validate.notVoid(query)

  return (async () => {
    let users = await User.find({
      $or: [{ name: new RegExp(query, 'i') }]
    }).lean()

    users = users.map(user => {
      user.id = user._id.toString()
      delete user._id
      delete user.__v

      return user
    })

    return users
  })()
}
