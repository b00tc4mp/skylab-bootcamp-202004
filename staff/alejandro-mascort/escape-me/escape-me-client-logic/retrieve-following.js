require('escape-me-commons/polyfills/string')
const { utils: { call } } = require('escape-me-commons')
const context = require('./context')

module.exports = function (token, userId) {
    String.validate.notVoid(token)
    if (userId) String.validate.notVoid(userId)

    return call('GET', `${this.API_URL}/following/${userId ? userId : ''}`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)