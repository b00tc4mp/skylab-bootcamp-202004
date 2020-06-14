require('escape-me-commons/polyfills/string')
const { utils: { call }, errors: { UnexistenceError } } = require('escape-me-commons')

const context = require('./context')

module.exports = function (token, query) {
    String.validate.notVoid(token)
    String.validate.notVoid(query)

    return call('GET', `${this.API_URL}/users/search/${query ? query : ''}`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new UnexistenceError(error)
            }
        })
}.bind(context)