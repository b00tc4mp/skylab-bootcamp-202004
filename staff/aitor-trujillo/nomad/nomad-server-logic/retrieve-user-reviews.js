require('nomad-commons/polyfills/string')

const { models: { Workspace, User } } = require('nomad-data')

module.exports = async (userId) => {

    String.validate.notVoid(userId)

    //const userPopulated = await User.findOne({ _id: userId }).populate({ path: 'reviews' })
    const userPopulated = await Workspace.find({ 'reviews.user': userId })

    //if (!userPopulated) throw new UnexistenceError(`user with id ${userId} does not exist`)
    // return userPopulated

    debugger
    const reviews = userPopulated.filter((workspace, index) => workspace.reviews.user.toString() === userId)
    // const [...reviews] = userPopulated.reviews
    // const results
    debugger

    if (!reviews) throw new Error("You don't have any workspaces :(")

    return reviews
}
