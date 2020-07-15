/**
 * Update User.
 * 
 * @param {string} userId take by token.  
 * @param {string} name new username.  
 * @param {string} surname new surname.   
 * @param {string} email new email.  
 * @param {string} password the user password.  

 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {CredentialsError} if you want a share a book and it not yours.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return No return nothig if successfully request.
 *
 */


require('books-commons/polyfills/string')
const { utils: {Email,call} } = require('books-commons')
const context = require('./context');

module.exports = function (name,surname,email,password) {
    if(name)String.validate.notVoid(name)
    if(surname) String.validate.notVoid(surname)
    if(email) Email.validate(email)
    String.validate.notVoid(password)

    
    return (async() => {
        const token = await this.storage.getItem('token')
       const resp = await call(
           'PATCH',
           `${this.API_URL}/users/update`,
           JSON.stringify({name,surname,email,password}),
           { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

        const {status,body} = resp

        if(status===200) return 
        else{
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })()
}.bind(context)