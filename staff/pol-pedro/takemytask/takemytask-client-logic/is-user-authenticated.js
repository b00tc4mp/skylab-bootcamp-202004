require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/function')
const { utils: { call } } = require('takemytask-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ body }) => {
            const {name} = JSON.parse(body)
            return name
        })
}.bind(context)