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

