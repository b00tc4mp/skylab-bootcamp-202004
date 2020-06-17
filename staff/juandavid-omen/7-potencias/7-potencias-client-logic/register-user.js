require('7-potencias-commons/polyfills/string')
const { utils: { Email, call } } = require('7-potencias-commons')
const context = require('./context')

module.exports = function (name, surname, email, password) {
  String.validate.notVoid(name)
  String.validate.notVoid(surname)
  Email.validate(email)
  String.validate.lengthGreaterEqualThan(password, 8)

  return call(
    'POST',
    `${this.API_URL}/users`,
    `{"name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
    { 'Content-type': 'application/json' }
  )
    .then(({ body, status }) => {
      if (status === 201) return

      const { error } = JSON.parse(body)

      throw new Error(error)
    })
}.bind(context)
