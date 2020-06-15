/**
 * Register User.
 * 
 * @param {string} name The user name. 
 * @param {string} surname The user surname.
 * @param {string} email The user email.
 * @param {string} password The user password.
 * 
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 * 
 * @return If is register don't return nothing.
 */



require('books-commons/polyfills/string')
const { utils: { Email, call } } = require('books-commons')
const context = require('./context')

module.exports = function (name, surname, email, password) {
    String.validate.notVoid(name)
    String.validate.notVoid(surname)
    String.validate.notVoid(email)
    String.validate.notVoid(password)
    
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return (async()=>{
        const resp = await call(
            'POST',
            `${this.API_URL}/users/register`,
            `{ "name": "${name}", "surname": "${surname}", "email": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' }
        )

        const {status,body} = resp

        if(status===201) return 

        const { error } = JSON.parse(body)

        throw new Error(error)
    })()    
}.bind(context)