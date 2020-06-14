require('7-potencias-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User } } = require('7-potencias-data')
const bcrypt = require('bcryptjs')
module.exports = (userId, data) => {
  if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)

  const { name, surname, password } = data

  if (name) String.validate.alphabetic(name)
  if (surname) String.validate.alphabetic(surname)
  if (password) String.validate.lengthGreaterEqualThan(password, 8)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    if (name) user.name = name
    if (surname) user.surname = surname
    if (password) user.password = await bcrypt.hash(password, 8)

    return user.save({ userId, $set: { data } })
  })()
}
