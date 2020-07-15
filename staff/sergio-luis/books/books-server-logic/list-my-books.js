/**
 * list-my-books.
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
const { models: { User, Book } } = require('books-data')

module.exports = (userId) => {
   
    String.validate.notVoid(userId)
  
    return (async() => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        const books = await Book.find({ actualUserId: userId }).lean()

        if (!books.length) throw new UnexistenceError("Dont`t have books in your library")

       const _books = books.map(book => {
          book.id = book._id.toString();
          delete book._id;
          delete book.__v;
          return book
      })

        return await _books
    })()
}