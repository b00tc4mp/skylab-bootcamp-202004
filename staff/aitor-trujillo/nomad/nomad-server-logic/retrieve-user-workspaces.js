/**
 * Retrieves user created workspaces.
 * 
 * @param {string} userId The workspace values. 
 * 
 * @returns {Promise<String>} The workspaces array if it resolves, an error if it rejects.
 * 
 * @throws {UnexistenceError} If cannot find user with userId.
 * @throws {Error} If there is no workspaces created to retrieve.
 */

require('nomad-commons/polyfills/string')
const { models: { Workspace, User } } = require('nomad-data')
const { UnexistenceError } = require('nomad-commons/errors')

module.exports = async (userId) => {

    String.validate.notVoid(userId)

    const userPopulated = await User.findOne({ _id: userId }).populate({ path: 'userWorkspaces' })

    if (!userPopulated) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const userWorkspaces = userPopulated.userWorkspaces

    if (!userWorkspaces.length) throw new Error("You don't have any workspaces :(")

    return userWorkspaces
}

