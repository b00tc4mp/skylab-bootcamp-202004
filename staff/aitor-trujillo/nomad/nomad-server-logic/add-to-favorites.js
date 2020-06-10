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
    if (!ws) throw new UnexistenceError(`workspace with id ${ws} does not exist`)

    user.favorites.push(workspaceId)
    await user.save()

    return
}