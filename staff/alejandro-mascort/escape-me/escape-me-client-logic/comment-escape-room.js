require('escape-me-commons/polyfills/string')
require('escape-me-commons/polyfills/number')

const { utils: { call } } = require('escape-me-commons')
const context = require('./context')
const { errors: { UnexistenceError } } = require('escape-me-commons')

module.exports = function (escapeId, comment) {
    String.validate(escapeId)
    String.validate(comment)

    const { token } = context.storage

    return call(
        'POST',
        `${this.API_URL}/escape/comment/`,
        `{ "escapeId": "${escapeId}", "comment": "${comment}" }`,
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