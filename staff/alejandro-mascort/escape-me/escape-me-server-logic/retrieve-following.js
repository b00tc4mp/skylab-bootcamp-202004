require('escape-me-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('escape-me-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId).populate('following').lean()
        if (!user) throw new Error(`user with id ${userId} does not exist`)

        delete user.id
        delete user._id

        const following = user['following'].map(({ _id, name, surname, username }) => ({ id: _id, name, surname, username }))

        return following
    })()
}