require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/function')
const { utils: {call} } = require('termometro-commons')
const context = require('./context')


module.exports = function(token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}.bind(context)