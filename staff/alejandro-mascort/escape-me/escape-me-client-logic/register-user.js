require('escape-me-commons/polyfills/string')
const { utils: { Email, call } } = require('escape-me-commons')
const context = require('./context')
const { errors: { DuplicityError } } = require('escape-me-commons')

module.exports = function (name, surname, username, email, password) {
    String.validate(username)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    const body = { username, email, password }
    if (name) {
        String.validate(name)
        body.name = name
    }
    if (surname) {
        String.validate(surname)
        body.surname = surname
    }

    return call(
        'POST',
        `${this.API_URL}/users`,
        JSON.stringify(body),
        { 'Content-type': 'application/json' }
    )
        .then(({ status, body }) => {

            if (status === 201) return

            const { error } = JSON.parse(body)

            throw new DuplicityError(error)
        })
}.bind(context)