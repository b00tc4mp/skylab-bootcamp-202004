/**
 * Retrieve book.
 * 
 * @param {string} bookId book id  
 *
 * @throws {UnexistenceError} if don`t find any book in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object}  return a book.
 *
 */

require('books-commons/polyfills/string')

const { errors: { UnexistenceError } } = require('books-commons')
const { models: { Book} } = require('books-data')

module.exports = (bookId) => {
    String.validate.notVoid(bookId)


    return (async() => {
        const book = await Book.findById(bookId).populate('ownerUserId').populate('actualUserId').lean()

        if (!book) throw new UnexistenceError(`book with id ${bookId} does not exist`);
            book.id = book._id.toString()
            delete book._id;
            delete book.__v;

        return book
    })()
}