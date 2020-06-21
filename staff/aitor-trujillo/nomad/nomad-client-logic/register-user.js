require('nomad-commons/polyfills/string')
const { utils: { Email, call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (name, surname, email, password) {
    String.validate(name)
    String.validate(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return (async () => {
        const result = await call(
            'POST',
            `${this.API_URL}/users/`,
            `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' }
        )

        const { status, body } = result

        if (status === 201) return

        const { error } = JSON.parse(body)
        throw new Error(error)
    })()
}.bind(context)