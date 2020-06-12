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
require('books-commons/polyfills/number')

const {  utils: { Email },errors: { UnexistenceError,CredentialsError} } = require('books-commons')
const { models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')

module.exports = (userId,name,surname,email,password) => {

    String.validate.notVoid(userId)
    if(name)String.validate.notVoid(name)
    if(surname) String.validate.notVoid(surname)
    if(email) Email.validate(email)
    String.validate.notVoid(password)

    
    return (async() => {
        const user = await User.findById(userId) 
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        const match  = await bcrypt.compare(password, user.password)
        if(!match) throw new CredentialsError('The password is not valid')

       if(email) {
           const newEmail = await User.find({email})
           debugger
            if(newEmail.length!== 0) throw new Error ('this email already exist')
       }

       if(name) await User.findByIdAndUpdate(userId, { $set:{name}})
       if(surname) await User.findByIdAndUpdate(userId, { $set:{surname}})
       if(email) await User.findByIdAndUpdate(userId, { $set:{email}})   
    })()
}