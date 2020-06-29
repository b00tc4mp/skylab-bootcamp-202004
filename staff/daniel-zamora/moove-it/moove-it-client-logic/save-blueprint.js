const { utils: { call } } = require('moove-it-commons')
require('moove-it-commons/polyfills/string')
require('moove-it-commons/polyfills/number')
require('moove-it-commons/polyfills/array')
const context = require('./context')

module.exports = function(blueprintId, items) {
    
    const { token } = this.storage

    String.validate.notVoid(token)
    String.validate.notVoid(blueprintId)
    Array.validate(items)

    const data = { blueprintId, items}


    return call('PATCH', `${this.API_URL}/blueprint/save`,
            JSON.stringify(data), { 'Content-type': 'application/json', Authorization: `Bearer ${token}` })
        .then(({ status, body }) => {

            if (status === 201) {

                return ('Blueprint updated')

            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)