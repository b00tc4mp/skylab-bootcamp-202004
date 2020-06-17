/**
 * Authenticate User.
 * 
 * @param {string} email The user email. 
 * @param {string} password The user password eith min length 8.

 * @throws {CredentialError} if the you introduce a wrong password.
 * @throws {UnexistenceError} if the email is not registered.
 * @throws {VoidError} if don`t introduce name or surname or email or password.
 * @throws {TypeError} if name or surname or email or password are not a string.
 * @throws {Error} if you introduce a email with less than 8 caracteres.
 * 
 * @return Token.
 *
 */

require('books-commons/polyfills/string')
const { utils: { Email, call } } = require('books-commons')
const context = require('./context')

module.exports = function (email, password) {
    String.validate.notVoid(email)
    String.validate.notVoid(password)

    const _email = email.trim().toLowerCase()
    const _password = password.trim().toLowerCase()

    Email.validate(_email)
    String.validate.lengthGreaterEqualThan(_password,8);

    return (async()=>{
        const resp = await call(
            'POST',
            `${this.API_URL}/users/authenticate`,
            `{"email": "${_email}", "password": "${_password}"}`,
            { 'Content-type': 'application/json' })

        const {status,body} = resp

        if(status===200){
            const {token} = JSON.parse(body)

            await this.storage.setItem('token', token)
        }else{
            const { error } = JSON.parse(body)
            throw new Error(error)
        } 
    })()
}.bind(context)

