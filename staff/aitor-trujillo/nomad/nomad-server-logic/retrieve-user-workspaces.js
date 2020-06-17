require('nomad-commons/polyfills/string')

const { models: { Workspace, User } } = require('nomad-data')

module.exports = async (userId) => {

    String.validate.notVoid(userId)

    const userPopulated = await User.findOne({ _id: userId }).populate({ path: 'userWorkspaces' })

    if (!userPopulated) throw new UnexistenceError(`user with id ${userId} does not exist`)
    // return userPopulated
    const userWorkspaces = userPopulated.userWorkspaces

    if (!userWorkspaces.length) throw new Error("You don't have any workspaces :(")

    return userWorkspaces
}

