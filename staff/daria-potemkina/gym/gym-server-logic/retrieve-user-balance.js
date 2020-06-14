require('gym-commons/polyfills/string')
const { mongoose, models: { User, AccountBalance } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')
const { ObjectId } = mongoose

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        let balance = await AccountBalance.find({ user: ObjectId(userId) }).sort({ date: -1 }).lean()

        if (!balance.length) throw new UnexistenceError('the balance is empty, there are no operations yet')

        for (let i in balance){
            delete balance[i]._id
            delete balance[i].user
            delete balance[i].__v
        }

        return balance

    })()
}