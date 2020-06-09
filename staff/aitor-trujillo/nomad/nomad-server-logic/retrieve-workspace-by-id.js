require('nomad-commons/polyfills/string')

const { models: { Workspace } } = require('nomad-data')

module.exports = async (workspaceId) => {

    String.validate.notVoid(workspaceId)

    const workspaceFound = await Workspace.findById(workspaceId).lean()

    if (!workspaceFound) throw new Error(`workspace with id ${workspaceId} does not exist`)

    return workspaceFound
}
