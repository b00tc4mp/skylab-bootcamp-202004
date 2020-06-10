/**
 * retrieve the last ph in collection of temperatures listed in the app,
 * is conditioned by role admin
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

require('aquaponics-commons/polyfills/string')
const { models: { Ph,User } } = require('aquaponics-data')
const { errors: { CredentialsError, UnexistenceError } } = require('aquaponics-commons')

module.exports = userId => {
    debugger
    String.validate.notVoid(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new UnexistenceError(`user with ${userId} does not exist`)

            if (user.role !== "admin") throw new CredentialsError(`your role does not allow you to acces here`)
            return Ph.find().lean()
                .then(allPhs =>
                    allPhs[allPhs.length-1]
                )
        })
}

/**
 * @promise returns:
 * @return {UnexistenceError} if user can not be found with Id provided.
 * @return {CredentialsError} if user is not admin.
 * @return {object} with last ph and date.
 *
 */