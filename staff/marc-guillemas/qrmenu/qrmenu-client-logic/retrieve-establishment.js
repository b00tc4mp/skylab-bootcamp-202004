const context = require('./context')
require('qrmenu-commons/polyfills/string')
const {utils: {call}} = require('qrmenu-commons')

/**
 * @param {string} token of the current worker
 */

module.exports = function(token) {
    String.validate(token)

    return call(
        'GET',
        `${this.API_URL}/establishment`,
        undefined, 
        { 'Authorization': `Bearer ${token}` }
    )
    .then(({status, body}) => {
        if(status === 200) {
            return body
        }
        const {error} = JSON.parse(body)

        throw new Error(error)
    })


}.bind(context)