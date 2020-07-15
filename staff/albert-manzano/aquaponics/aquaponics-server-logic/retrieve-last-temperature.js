/**
 * retrieve the last temperature in the collection of temperatures listed in the app,
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

require('aquaponics-commons/polyfills/string')
const { models: { Temperature,User } } = require('aquaponics-data')
const { errors: { CredentialsError, UnexistenceError } } = require('aquaponics-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new UnexistenceError(`user with ${userId} does not exist`)

            if (user.role !== "admin") throw new CredentialsError(`your role does not allow you to acces here`)
            return Temperature.find().lean()
                .then(allTemperatures =>
                    allTemperatures[allTemperatures.length-1]
                )
        })
}

/**
 * @promise returns:
 * @return {UnexistenceError} if user can not be found with Id provided.
 * @return {CredentialsError} if user is not admin.
 * @return {object} with last temperature and date.
 *
 */