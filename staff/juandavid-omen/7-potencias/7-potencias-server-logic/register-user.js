require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/json')
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
