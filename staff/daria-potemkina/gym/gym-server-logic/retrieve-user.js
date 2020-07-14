/**
 * Retrieve user
 * 
 * @param {string} userId the userId
 * 
 * @returns {Promise <Object>} the user if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the user does not exist
 * @throws {TypeError} if the parameter does not match the corresponding type
 * @throws {Error} if the parameter is empty or blank
 */

require('gym-commons/polyfills/string')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: userId }).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        delete user._id
        delete user.password
        delete user.card
        delete user.__v

        return user

    })()
}