require('gym-commons/polyfills/string')
const { utils: { Email, call } } = require('gym-commons')
const context = require('./context')

module.exports = function (name, surname, email, password) {
    String.validate(name)
    String.validate(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    return call('POST', `${this.API_URL}/users`,
        `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status !== 201) {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
            return
        })
}.bind(context)