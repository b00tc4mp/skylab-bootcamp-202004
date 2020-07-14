const context = require('./context')
require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/array')
const {utils: {call}} = require('qrmenu-commons')

/**
 * @param {string} establishmentId id of the establishment
 * @param {string} tableId id of the table
 * @param {array} dishes multiple dishes id's
 */

module.exports = function(establishmentId, tableId, dishes) {
    
    String.validate(establishmentId)
    String.validate(tableId)
    Array.validate(dishes)
    return call('POST', `${this.API_URL}/establishment/${establishmentId}/table/${tableId}`,
    `{"dishes": "${dishes}" }`,
    {'Content-type' : 'application/json'})
        .then(({status}) => {
            
            
            if(status === 200) {
                return
            }

            const {error} = JSON.parse(body)

            return error
            
        })


}.bind(context)