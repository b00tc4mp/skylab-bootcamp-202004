/**
 * Retrieves user favorites.
 * 
 * @param {string} userId The workspace values. 
 * 
 * @returns {Promise<String>} The workspaces marked as favorite if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {UnexistenceError} Cannot find user by userId.
 * @throws {Error} If there is no favorite workspaces.
 */

require('nomad-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('nomad-commons')
const { models: { User } } = require('nomad-data')

module.exports = async (userId) => {
    String.validate.notVoid(userId)

    const userPopulated = await User.findOne({ _id: userId }).populate({
        path: 'favorites',
    })
    if (!userPopulated) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const favWorkspaces = userPopulated.favorites

    if (!favWorkspaces.length) throw new Error("You don't have favorite workspaces :(")

    return favWorkspaces
}

