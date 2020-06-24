/**
 * Saves workspaceId to user favorites array, or removes it if it's already included.
 * 
 * @param {string} userId The workspace values. 
 * @param {string} workspaceId The workspace id to retrieve. 
 * 
 * @returns {Promise<String>} Nothing if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {UnexistenceError} If userId does not matches any user.
 * @throws {UnexistenceError} If workspaceId does not matches any workspace.
 */

require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('nomad-commons')
const { models: { Workspace, User } } = require('nomad-data')

module.exports = async (userId, workspaceId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(workspaceId)

    const user = await User.findById(userId)

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const ws = await Workspace.findById(workspaceId)
    if (!ws) throw new UnexistenceError(`workspace with id ${workspaceId} does not exist`)

    const index = user.favorites.indexOf(workspaceId)
    if (index > -1) user.favorites.splice(index, 1)
    else user.favorites.push(workspaceId)

    await user.save()

    return
}