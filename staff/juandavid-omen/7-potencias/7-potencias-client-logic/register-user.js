/**
 * Register user
 *
 * @param {string} name the user name.
 * @param {string} surname the user surname.
 * @param {string} email the user e-mail.
 * @param {string} password the user password.
*
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If the password does match the required format.
 */

require('7-potencias-commons/polyfills/string')
const { utils: { Email, call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function (name, surname, email, password) {
  String.validate.notVoid(name)
  String.validate.notVoid(surname)
  Email.validate(email)
  String.validate.lengthGreaterEqualThan(password, 8)

  return (async () => {
    const result = await call(
      'POST',
    `${this.API_URL}/users`,
    `{"name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
    { 'Content-type': 'application/json' }
    )

    const { body, status } = result

    if (status === 201) return

    const { error } = JSON.parse(body)

    throw new Error(error)
  })()
}.bind(context)
