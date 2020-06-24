const context = require('./context')
require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/array')
const {utils: {call}} = require('qrmenu-commons')

/**
 * @param {string} token of the current worker
 */

module.exports = function(token, dishesIds) {
    String.validate(token)
    
    Array.validate(dishesIds)

    return call(
        'POST',
        `${this.API_URL}/dish`,
        JSON.stringify({dishesIds}), 
        { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }
    )
    .then(({status, body}) => {
        if(status === 200) {  
            return JSON.parse(body)
        }
        const {error} = JSON.parse(body)

        throw new Error(error)
    })


}.bind(context)