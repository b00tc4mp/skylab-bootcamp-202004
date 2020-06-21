/**
 * Retrieve user balance
 * 
 * @param {string} userId the user id
 * 
 * @returns {Promise <Array>} the balance of all transactions if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the user or balance do not exist
 * @throws {TypeError} if the parameter does not match the corresponding type
 * @throws {Error} if the parameter is empty or blank
 */


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