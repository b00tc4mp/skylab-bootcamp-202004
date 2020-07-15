/**
 * Checks user credentials.
 * 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * 
 * @returns {Promise<String>} The authorization token if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 */
require('misc-commons/polyfills/string')
const { utils: { Email, call } } = require('misc-commons')

module.exports = (email, password) => {
    Email.validate(email)

    String.validate.notVoid(password)

    return call('POST', 'http://localhost:8080/users/auth',
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
        .then(({ status, body }) => {
            if (status === 200) {
                const { token } = JSON.parse(body)

                return token
            } else {
                const { error } = JSON.parse(body)

                throw new Error(error)
            }
        })
}