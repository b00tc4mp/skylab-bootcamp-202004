/**
 * Add user card
 * 
 * @param {string} userId the user id
 * @param {string} number the card number
 * @param {string} holder the card holder
 * @param {date} expirationDate the card expiration date
 * @param {string} cvv the card cvv
 * 
 * @returns {Promise} if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if user does not exist
 * @throws {TypeError} if any of the parameters does not match the corresponding type.
 * @throws {Error} if any of the parametera is empty or blank
 */

require('gym-commons/polyfills/string')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = (userId, number, holder, expirationDate, cvv) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(number)
    String.validate.notVoid(holder)
    if(expirationDate instanceof Date === false) throw new TypeError(`${expirationDate} is not a date`)
    String.validate.notVoid(cvv)

    return (async () => {
        const user = await User.findOne({ _id: userId })

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        
        const card = { number, holder, expirationDate, cvv }

        await User.updateOne({ _id: userId }, { $set: { card } })

    })()
}