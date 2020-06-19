require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/number')

const { utils: { call } } = require('escape-me-commons')
const context = require('./context')
const { errors: { UnexistenceError } } = require('escape-me-commons')

module.exports = function (escapeId, rating) {
    String.validate(escapeId)
    Number.validate.positive(rating)

    const { token } = context.storage

    return call(
        'POST',
        `${this.API_URL}/escape/rate/`,
        `{ "escapeId": "${escapeId}", "rating": "${rating}" }`,
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