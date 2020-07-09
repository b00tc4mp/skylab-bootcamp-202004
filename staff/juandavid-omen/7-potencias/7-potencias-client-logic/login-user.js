/**
 * Checks user credentials.
 *
 * @param {string} email the user e-mail.
 * @param {string} password the user password.
*
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If the password is empty.
 */

require('7-potencias-commons/polyfills/string')
const { utils: { Email, call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function (email, password) {
  Email.validate(email)
  String.validate.notVoid(password)

  return call('POST', `${this.API_URL}/users/auth`,
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
    .then(({ status, body }) => {
      if (status === 200) {
        const { token } = JSON.parse(body)

        this.storage.token = token
      } else {
        const { error } = JSON.parse(body)

        throw new Error(error)
      }
    })
}.bind(context)
