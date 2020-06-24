/**
 * Retrieves workspace by it's id.
 * 
 * @param {string} workspaceId The workspace id to retrieve. 
 * 
 * @returns {Promise<String>} The workspace object if it resolves, an error if it rejects.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If can not find the workspace by it's id, or other unexpected errors.
 */

require('nomad-commons/polyfills/string')

const { models: { Workspace } } = require('nomad-data')

module.exports = async (workspaceId) => {
    String.validate.notVoid(workspaceId)

    const workspaceFound = await Workspace.findOne({ _id: workspaceId }).populate({
        path: 'reviews',
        populate: { path: 'user', model: 'User', select: ['name', 'surname'] }
    })

    if (!workspaceFound) throw new Error(`workspace with id ${workspaceId} does not exist`)

    return workspaceFound
}

