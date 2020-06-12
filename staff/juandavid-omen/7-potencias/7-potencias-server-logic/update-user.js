require('7-potencias-commons/polyfills/string')
const { utils: { Email } } = require('7-potencias-commons')
const { mongo } = require('7-potencias-data')
const { ObjectId } = mongo
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { env: { MONGODB_URL } } = process

module.exports = (userId, data) => {
  if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)

  const { name, surname, email, password } = data

  if (name) String.validate.notVoid(name)
  if (surname) String.validate.notVoid(surname)

  String.validate.notVoid(email)
  Email.validate(email)
  String.validate.notVoid(password)

  return mongo.connect(MONGODB_URL)
    .then(connection => {
      const users = connection.db().collection('users')

      return users.findOne({ _id: ObjectId(userId) })
        .then(user => {
          if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

          const newUser = { name, surname, email, password }

          return users.updateOne({ _id: ObjectId(userId) }, { $set: newUser })
        })
    })
}
