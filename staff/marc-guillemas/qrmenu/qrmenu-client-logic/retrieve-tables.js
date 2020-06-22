require('qrmenu-commons/polyfills/string')
// require('qrmenu-commons/polyfills/function')
const { utils: { call } } = require('qrmenu-commons')
const context = require('./context')

module.exports = function (token) {

    String.validate.notVoid(token)
    debugger
    return call('GET', `${this.API_URL}/tables`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            debugger
            if(status === 200) {
                const tables = JSON.parse(body)
                return tables
            }

            const {error} = JSON.parse(body)

            return error
            
        })
}.bind(context)