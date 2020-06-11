require('gym-commons/polyfills/string')
const { mongoose, models: { User, AccountBalance } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId).sort({ date: -1 })

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        const balance = await AccountBalance.find({ user: ObjectId(userId) }).lean()

        if (!balance) throw new UnexistenceError('the balance is empty, there are no operations yet')

        return balance

    })()
}