/**
 * list-my-library.
 * 
 * @param {string} userId take by token.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object}  return an array of books.
 *
 */

require('books-commons/polyfills/string')

const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User} } = require('books-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        const followingUsers = await User.find({ following: userId }).lean();

        followingUsers.forEach(user => {
            user.id = user._id.toString();

        })

        if(!user.requestedBooks.length)new UnexistenceError("you don`t have any books requested");

        return user.requestedBooks
    })()
}