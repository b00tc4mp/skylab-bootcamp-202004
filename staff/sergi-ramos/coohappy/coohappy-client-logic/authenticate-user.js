require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const context = require('./context')

/**
 * Authenticate user.
 * 
 * @param {string} email User email. 
 * @param {string} password User password.
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = function(email, password) {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return (async () => {

        const res = await call('POST', `${this.API_URL}/users/auth`, JSON.stringify({ email, password }), { 'Content-Type': 'application/json' })
        if (res.status === 200) {
         
            const { token } = JSON.parse(res.body)
   
            await this.storage.setItem('TOKEN', token)
            return
        } else {

            const { error } = JSON.parse(res.body)

            throw new Error(error)
        }

    })()
}.bind(context)