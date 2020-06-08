require('gym-commons/polyfills/string')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: userId }).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        delete user._id
        delete user.password
        delete user.card
        delete user.products
        delete user.guarantee
        delete user.__v

        return user

    })()
}