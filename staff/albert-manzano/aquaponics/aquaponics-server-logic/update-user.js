/**
 * should update inputs of previous registered user.
 * 
 * @param {string} name user's updated name.
 * @param {string} surname user's updated surname.
 * @param {string} password user's new pasword.
 * @param {number} phone user's new phone number.
 * @param {email} email user's new email.
 * @throws {TypeError} if inputs do not match whats is expected.
 * @throws {Error} if input does not match what is expected.
 */

require('aquaponics-commons/polyfills/string')
const { utils: { Email } } = require('aquaponics-commons')
const { models: { User } } = require('aquaponics-data')
const { errors: { UnexistenceError } } = require('aquaponics-commons')
require('aquaponics-commons/polyfills/number')

module.exports = (userId, updateUser) => {
    if (typeof updateUser !== 'object') throw new TypeError(`${updateUser} is not an object`)

    const { name, surname, email, password, phone } = updateUser

    if (name) String.validate.notVoid(name)
    if (surname) String.validate.notVoid(surname)
    if (phone) Number.validate(phone)
    if (email) {
        String.validate.notVoid(email)
        Email.validate(email)
    }
    
    if (password){
        String.validate.notVoid(password)
        //others??
    }

    return User.findByIdAndUpdate(userId, { $set:  { name, surname, email, password }
    })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            return user.save(updateUser)
        })
        .then(()=>{ })
}


 /**
  * @promise returns:
  * @returns {UnexistenceError} if user's id does not match.
  * @returns {Error} if there was a connection problem.
  * @returns empty if succeded.
  * 
  */