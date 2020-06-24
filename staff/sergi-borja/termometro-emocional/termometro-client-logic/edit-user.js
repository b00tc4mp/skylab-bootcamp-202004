const { utils: { call } } = require('termometro-commons')
const context = require('./context')

/**
 * Checks user credentials.
 * 
 * @param {string} name
 * @param {string} surname
 * @param {string} age
 * @param {string} sex
 * @param {string} location
 * @param {string} email
 * @param {string} memberId
 *  * 
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

module.exports = function (name, surname, age, sex, location, email, memberId) {
    return call('PATCH',
        `${this.API_URL}/users/${memberId}`,
        `{ "name": "${name}", "surname": "${surname}", "age": "${age}", "sex": "${sex}", "location": "${location}", "email": "${email}"}`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 204) {
                return
            } else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
        })
}.bind(context)