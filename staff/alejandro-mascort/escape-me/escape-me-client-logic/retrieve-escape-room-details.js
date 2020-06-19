require('escape-me-commons/polyfills/string')
const { utils: { call } } = require('escape-me-commons')
const context = require('./context')

module.exports = function (escapeId) {
    String.validate.notVoid(escapeId)

    return call('GET', `${this.API_URL}/escape/details/${escapeId}`,
        undefined,
        { 'Content-Type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)