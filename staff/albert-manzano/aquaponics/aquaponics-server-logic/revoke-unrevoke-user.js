/**
 * Changes the status of the user registered between enable and disable
 * default is enable
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

require('aquaponics-commons/polyfills/string')
const { models: { User } } = require('aquaponics-data')
const { errors: { UnexistenceError } } = require('aquaponics-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new UnexistenceError(`user with ${userId} does not exist`)
            
            if (user.status === "enable") user.status="disable"
            else user.status="enable"

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