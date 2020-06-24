/**
 * Checks user credentials.
 * 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * @returns {Promise<String>} The authorization token if it resolves, an error if it rejects.
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 */
require('aquaponics-commons/polyfills/number')
require('aquaponics-commons/polyfills/string')
const { utils: { Email, call } } = require('aquaponics-commons')
const __context__ = require('./context')

module.exports = function (userId,userUpdate) {
    if(!userUpdate instanceof Object)throw new Error('hola')
    let { name, surname, email, password, phone, role, status, confirmed } = userUpdate
    
    if (name) String.validate.notVoid(name)
    if (surname) String.validate.notVoid(surname)
    if (phone) Number.validate(phone)
    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }

    if (confirmed) confirmed = true

    if (role) {
        String.validate.notVoid(role)
        
    }
    if (status) {
        String.validate.notVoid(status)
            }

    if (password) {
        String.validate.notVoid(password)
    }

    return call(
        'PATCH',
        `${this.API_URL}/users/${userId}`,
        { userUpdate },
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {

            if (status === 204) return 
            else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}.bind(__context__)

/**
 * @async returns:
 * @return {UnexistenceError} if users email is not found on data base.
 * @return {CredentialsError} if users password doesnt match the email provided.
 * @return {Error} It may receive an error in case remote logic fails or there is a network problem.
 * set id in context {user.id} returns the Id if succeded.
 */