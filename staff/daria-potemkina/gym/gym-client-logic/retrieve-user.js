/**
 * Return the user data
 * 
 * @param {string} token The user token.
 * 
 * @returns {Promise<Object>} The user data without password if it resolvs, an error if rejects.
 * 
 * @throws {TypeError} If the parameter does not match the corresponding type.
 * @throws {Error} If the parameter is empty or blank
 */

require('gym-commons/polyfills/string')
const { utils: { call } } = require('gym-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)

    return call('GET', `${this.API_URL}/users`,
        undefined,
        { 'Authorization': `Bearer ${token}` })
        .then(({ status, body }) => {
            if (status === 200) {
                return JSON.parse(body)
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(context)