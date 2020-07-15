/**
 * Retrieve Avg score
 * 
 * @param {string} userId The id of the user normaly we take this value by query. 
 * 
 * @throws {VoidError} if don`t introduce any userId.
 * @throws {Error} if the userId don`t exist in database.
 * 
 * @return {number} return a Number with avg score.
 *
 */

require('books-commons/polyfills/string')
const { errors: { UnexistenceError} } = require('books-commons')
const { models: { User } } = require('books-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return (async()=>{
        const user = await User.findById(userId)

        if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

        if(!user.avgScore) throw new UnexistenceError(`no score`)

        return user.avgScore
    })()
}