/**
 * Changes the confirmation of the user register
 * default is false
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

 require('aquaponics-commons/polyfills/string')
 const { models: {User} } =require ('aquaponics-data')
 const {  errors: { UnexistenceError } } = require('aquaponics-commons')

 module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId)
        .then(user =>{
            if (!user) throw new UnexistenceError (`user with ${userId} does not exist`)
            user.confirmed = true

            return user.save()
        })
 }

 /**
  * @promise returns:
  * @returns {UnexistenceError} if user's id does not match.
  * @returns {Error} if there was a connection problem.
  * @returns empty if succeded.
  * 
  */