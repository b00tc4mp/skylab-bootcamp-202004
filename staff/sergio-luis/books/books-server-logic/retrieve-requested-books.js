/**
 * Retrieved requested books.
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
        const user = await User.findById(userId).populate('requestedBooks').lean()
  
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        if(!user.requestedBooks.length) throw new UnexistenceError("you don`t have any books requested");

        const request = user.requestedBooks.map(book =>{
            book.id = book._id.toString();
            delete book._id;
            delete book.__v;
            return book
        })

        return request
    })()
}