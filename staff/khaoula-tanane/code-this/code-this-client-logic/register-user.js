require('code-this-commons/polyfills/string')
const { utils: { Email, call } } = require('code-this-commons')
const context = require('./context')

module.exports = function (name, email, password) {
    String.validate(name)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8, true)

    return call(
        'POST',
        `${this.API_URL}/users`,
        `{ "name": "${name}", "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {
            if (status === 201) return
            const { error } = JSON.parse(body)

            throw new Error(error)
        })
}.bind(context)