/**
 * Deletes existing workspace, only possible for it's creator.
 * 
 * @param {string} userId The workspace values. 
 * @param {string} workspaceId The workspace id to delete. 
 * 
 * @returns {Promise<String>} Returns removed object if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If could not delete the workspace.
 */

require('nomad-commons/polyfills/string')

const { models: { Workspace, User } } = require('nomad-data')

module.exports = async (userId, workspaceId) => {
    String.validate.notVoid(workspaceId)

    const workspaceFound = await Workspace.findOne({ _id: workspaceId })

    if (!workspaceFound) throw new Error(`workspace with id ${workspaceId} does not exist`)

    if (workspaceFound.creator.toString() === userId) {
        const user = await User.findById(userId)
        const index = user.userWorkspaces.indexOf(workspaceId)

        user.userWorkspaces.splice(index, 1)

        await user.save()

        return Workspace.findByIdAndRemove(workspaceId)

    } else throw new Error('Workspace Admin needed to remove.')
}