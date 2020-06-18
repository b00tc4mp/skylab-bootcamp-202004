require('termometro-commons/polyfills/string')
require('termometro-commons/polyfills/function')
const { utils: {call} } = require('termometro-commons')
const context = require('./context')


module.exports = function(token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(bodyAndState => {
            let body = JSON.parse(bodyAndState.body)
            return body
            
        })
}.bind(context)