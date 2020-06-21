/**
 * Retrieve user trades
 * 
 * @param {string} userId the user id
 * 
 * @returns {Promise <Array>} the user trades if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the user or contract does not exist
 * @throws {TypeError} if the parameter does not match the corresponding type
 * @throws {Error} if the parameter is empty or blank
 */

require('gym-commons/polyfills/string')
const { models: { User, Contract } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        const results = await Contract.find({ user: userId, isValid: true }).populate('product').populate('trades.price').lean()

        if (!results.length) throw new UnexistenceError('user do not have trades yet')

        for(let j in results)  {
            delete results[j].user
            delete results[j].__v
            delete results[j].product._id
            delete results[j].product.__v

            const { trades } = results[j]

            for (let i in trades) {
                delete trades[i]._id
                delete trades[i].price._id
                delete trades[i].price.product
                delete trades[i].price.__v
            }
        }

        return results

    })()


}