require('escape-me-commons/polyfills/string')
const { utils: { call } } = require('escape-me-commons')
const context = require('./context')

module.exports = function (userId) {
    if (userId) String.validate.notVoid(userId)

    const { token } = context.storage

    return call('GET', `${this.API_URL}/users/${userId ? userId : ''}`,
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