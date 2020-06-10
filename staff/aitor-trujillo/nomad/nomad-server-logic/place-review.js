require('nomad-commons/polyfills/string')
require('nomad-commons/polyfills/number')
require('nomad-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('nomad-commons')

const { models: { Workspace, Review, User } } = require('nomad-data')

module.exports = async (userId, workspaceId, stars, text) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(workspaceId)
    Number.validate(stars)
    String.validate.notVoid(text)

    const workspace = await Workspace.findById(workspaceId)
    if (!workspace) throw new UnexistenceError(`workspace with id ${workspaceId} does not exist`)

    const user = await User.findById(userId)
    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    workspace.reviews.push(new Review({ user: userId, stars, text }))
    await workspace.save()
    return
}