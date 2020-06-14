require('misc-commons/polyfills/string')
require('misc-commons/polyfills/function')
const { utils: { call } } = require('misc-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/worker`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}.bind(context)