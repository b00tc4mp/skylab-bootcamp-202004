require('7-potencias-commons/polyfills/string')
const { utils: { Email } } = require('7-potencias-commons')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User } } = require('7-potencias-data')
module.exports = (userId, data) => {
  if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)

  const { name, surname, email, password } = data

  if (name) String.validate.notVoid(name)
  if (surname) String.validate.notVoid(surname)

  String.validate.notVoid(email)
  Email.validate(email)
  String.validate.notVoid(password)

  return (async () => {
    const user = await User.findById(userId)
    
    if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

    const newUser = { name, surname, email, password }

    return user.save(userId, { $set: newUser })
  })()
}
