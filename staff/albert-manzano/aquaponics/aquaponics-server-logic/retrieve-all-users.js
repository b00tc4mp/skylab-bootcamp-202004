/**
 * retrieve de collection of users listed in the app,
 * is conditioned by role admin
 * 
 * @param {string} userId user's id
 * @throws {TypeError} if user's id is not a string nor empty
 * 
 */

require('aquaponics-commons/polyfills/string')
const { models: { User } } = require('aquaponics-data')
const { errors: { CredentialsError, UnexistenceError } } = require('aquaponics-commons')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return User.findById(userId)
        .then(user => {
            if (!user) throw new UnexistenceError(`user with ${userId} does not exist`)

            if (user.role !== "admin") throw new CredentialsError(`your role does not allow you to acces here`)
            return User.find().lean()
                .then(allUsers =>
                    allUsers = allUsers.map(user => {
                        delete user.password
                        user.id=user._id
                        delete user._id
                        return user
                    })
                )
        })
}

/**
 * @promise returns:
 * @return {UnexistenceError} if user can not be found with Id provided.
 * @return {CredentialsError} if user is not admin.
 * @return {array} of users is returned.
 *
 */