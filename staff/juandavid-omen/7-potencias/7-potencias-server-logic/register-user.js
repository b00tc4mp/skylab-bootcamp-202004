/**
 * create a new user.
 *
 * @param {string} name the user name.
 * @param {string} surname the user surname.
 * @param {string} email the user e-mail.
 * @param {string} password the user password.
 *
 * @throws {DuplicityError} if the user with the same e-mail already exists.
 */

require('7-potencias-commons/polyfills/string')
const { utils: { Email }, errors: { DuplicityError } } = require('7-potencias-commons')
const { models: { User } } = require('7-potencias-data')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, email, password) => {
  String.validate.notVoid(name)
  String.validate.notVoid(surname)
  String.validate.notVoid(email)
  Email.validate(email)
  String.validate.notVoid(password)
  String.validate.lengthGreaterEqualThan(password, 8)

  return (async () => {
    const user = await User.findOne({ email })

    if (user) throw new DuplicityError(`user with e-mail ${email} already exists`)

    const hash = await bcrypt.hash(password, 8)

    await User.create({ name, surname, email, password: hash, role: 'regular', created: new Date() })
  })()
}
