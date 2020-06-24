const context = require('./context')
require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/url')
const {utils: {Email, call, NIF}} = require('qrmenu-commons')

/**
 * @param {string} nif of the establishment 
 * @param {string} email of the worker
 * @param {string} password of the worker
 */

module.exports = function(nif, email, password) {
    NIF.validate(nif)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return call(
        'POST',
        `${this.API_URL}/user/auth`,
        `{"nif":"${nif}", "email":"${email}", "password": "${password}"}`,
        {'Content-type' : 'application/json'}
    )
    .then(({status, body}) => {
        if(status === 200) {
            const {token} = JSON.parse(body)
            return token
        }
        const {error} = JSON.parse(body)

        throw new Error(error)
    })

}.bind(context)
