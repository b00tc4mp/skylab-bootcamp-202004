require('takemytask-commons/polyfills/string')
const { utils: { Email, call } } = require('takemytask-commons')
const context = require('./context')

/**
 * calls the api with the email and password given and if matches returns a token
 *
 * @param {string} email users or worker email
 * @param {string} password users or worker password 
 * 
 * @returns {string}
 *
 * @throws {Error} if server throws errror
 */

module.exports = function (email, password) {
    Email.validate(email)

    String.validate.notVoid(password)

    return call('POST', `${this.API_URL}/users/auth`,
        `{ "email": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' })
            .then(({status, body}) => {
                if (status === 200){

                    const {token} = JSON.parse(body)

                    this.storage.token = token
                }else {

                    const { error } = JSON.parse(body)
                    throw new Error (error)
                }
            })
    
}.bind(context)