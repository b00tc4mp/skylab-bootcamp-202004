/**
 * list my books sharing.
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

        let books = await Book.find({ ownerUserId: userId  })
        const book = await Book.find({ toUserId: userId })
        .populate('fromUserId', 'name')
        .populate('bookId', 'title image')
        .lean()

        books = books.filter(book=> book.actualUserId !== userId)

        if (!books.length) throw new UnexistenceError("Dont`t have books sharing")

        books.forEach(book => {
            book.id = book._id.toString();
  
            delete book._id;
            delete book.__v;
        })

        return books
    })()
}