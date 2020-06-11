require('escape-me-commons/polyfills/string')
const { utils: { call } } = require('escape-me-commons')
const context = require('./context')
const { errors: { UnexistenceError } } = require('escape-me-commons')

module.exports = function (token, userId) {
    String.validate(token)
    String.validate(userId)

    return call(
        'PATCH',
        `${this.API_URL}/users/follow`,
        `{ "user": "${userId}" }`,
        {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    )
        .then(({ status, body }) => {

            if (status === 204) return

            const { error } = JSON.parse(body)

            throw new UnexistenceError(error)
        })
}.bind(context)