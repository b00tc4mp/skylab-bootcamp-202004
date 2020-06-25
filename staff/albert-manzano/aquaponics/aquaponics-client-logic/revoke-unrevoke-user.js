/**
 * Changes the status of the user registered between enable and disable
 * default is enable
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

require('aquaponics-commons/polyfills/string')
const { utils: { call } } = require('aquaponics-commons')
const __context__ = require('./context')

module.exports = function (userId) {
    String.validate.notVoid(userId)
    
    debugger
    return call(
        'PATCH',
        `${this.API_URL}/users/revoke/${userId}`,
         undefined, undefined)
        .then(({ status, body }) => {
            if (status === 204) return
            else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(__context__)

/**
 * @promise returns:
 * @returns {UnexistenceError} if user's id does not match.
 * @returns {Error} if there was a connection problem.
 * @returns empty if succeded.
 *
 */