require('moove-it-commons/polyfills/string')
const { errors: { UnexistenceError } } = require('moove-it-commons')
const { models: { User } } = require('moove-it-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async() => {

        const user = await User.findOne({ _id: userId }, { __v: 0, planes: 0, password: 0 }).lean()
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        user.id = user._id.toString()

        delete user._id

        return user

    })()
}