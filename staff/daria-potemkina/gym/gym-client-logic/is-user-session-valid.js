/**
 * Check if the user is authenticated
 * 
 * @param {string} token The user token
 * 
 * @returns {Promise<Boolean>} The true is user is authenticaded, otherwise false if it resolves, an error if it rejects
 * 
 * @throws {TypeError} If the parameter does not match the corresponding type.
 * @throws {Error} If the token does not exist.
 */

require('gym-commons/polyfills/string')
require('gym-commons/polyfills/function')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function () {
    const { token } = context.storage

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status }) => {
            return status === 200
        })
}.bind(context)