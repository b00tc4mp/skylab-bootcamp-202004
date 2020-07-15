require('misc-commons/polyfills/string')
const { models: { User } } = require('misc-data')
const { errors: { UnexistenceError } } = require('misc-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: userId }).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        delete user._id
        delete user.password
        delete user.cart

        return user

    })()
}