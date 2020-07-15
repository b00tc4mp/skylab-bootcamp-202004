/**
 * Return all info related to the user previously registered.
 * id and password not returned for safety
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

require('aquaponics-commons/polyfills/string')
const {  models: { User } } = require('aquaponics-data')
const {  errors: { UnexistenceError } } = require('aquaponics-commons')
module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new UnexistenceError(`user with ${userId} does not exist`)

            delete user._id
            delete user.password
            
            return user
        })
}

/**
 * @promise returns:
 * @return {UnexistenceError} if user can not be found with Id provided.
 * @return {object} user's info is returned
 *
 */