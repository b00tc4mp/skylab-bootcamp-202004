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