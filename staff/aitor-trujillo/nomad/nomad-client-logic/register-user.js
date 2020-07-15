/**
 * Creates new user.
 * 
 * @param {string} name The user name. 
 * @param {string} surname The user surname. 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * 
 * @returns {Promise<String>} Nothing if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If something went wrong, or if user email already is registered with other user.
 */

require('nomad-commons/polyfills/string')
const { utils: { Email, call } } = require('nomad-commons')
const context = require('./context')

module.exports = function (name, surname, email, password) {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    Email.validate(email)
    String.validate.notVoid(password)

    return (async () => {
        const result = await call(
            'POST',
            `${this.API_URL}/users/`,
            `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' }
        )

        const { status, body } = result

        if (status === 201) return

        const { error } = JSON.parse(body)
        throw new Error(error)
    })()
}.bind(context)