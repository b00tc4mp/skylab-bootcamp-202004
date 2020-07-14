/**
 * Retrieve user card
 * 
 * @param {string} userId the user id
 * 
 * @returns {Promise <Object>} the user card if it resolves, an error if it rejects
 * 
 * @throws {UnexistanceError} if the user or card does not exist
 * @throws {TypeError} if the parameter does not match the corresponding type
 * @throws {Error} if the parameter is empty or blank
 */


require('gym-commons/polyfills/string')
const { models: { User } } = require('gym-data')
const { errors: { UnexistenceError } } = require('gym-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findOne({ _id: userId }).lean()

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        
        if(!user.card) throw new UnexistenceError('user does not have a card added')

        delete user._id
        delete user.name
        delete user.surname
        delete user.email
        delete user.password
        delete user.card.cvv
        delete user.__v

        return user.card

    })()
}