require('coohappy-commons/polyfills/string')
const { utils: { Email, call } } = require('coohappy-commons')
const context = require('./context')



/**
 * Register user.
 * 
 * @param {string} name User name. 
 * @param {string} surname User surname. 
 * @param {string} email USer email. 
 * @param {string} password User password. 
 * @param {string} confirmPassword confirm password.
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = function(name, surname, email, password, confirmPassword) {

    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)


    return (async () => {
        const res = await call('POST',`${this.API_URL}/users`, JSON.stringify({ name, surname, email, password }), { 'Content-Type': 'application/json' })
        
    
        if (res.status === 201) return

                const { error } = JSON.parse(res.body)

                throw new Error(error)
            })()
}.bind(context)