require('escape-me-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('escape-me-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: ObjectId(userId) }, { __v: 0, password: 0 }).lean()
        if (!user) throw new Error(`user with id ${userId} does not exist`)

        delete user.id
        delete user._id

        const { name, surname, username, participated, pending, favorites, following } = user

        return { name, surname, username, participated, pending, favorites, following }
    })()
}