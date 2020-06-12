require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { mongo } = require('7-potencias-data')
const { ObjectId } = mongo

module.exports = (userId) => {
  String.validate.notVoid(userId)

  return mongo.connect()
    .then(connection => {
      const users = connection.db().collection('users')

      return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
          if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

          return user.cart
        })
    })
}
