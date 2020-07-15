/**
 * Delete book.
 * 
 * @param {string} userId take by token.  
 * @param {Object} bookId it is a unic id for a book created when we create the book.  

 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return Don`t return nothing if the book is deleted.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { errors: { UnexistenceError ,CredentialsError} } = require('books-commons')
const { models: { User, Book } } = require('books-data')

module.exports = (userId,bookId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(bookId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError("This user doesn't exists")
   
        const book = await Book.findById(bookId)
        
        if (!book) throw new UnexistenceError("This book doesn't exists")
        
        if(book.ownerUserId.toString() !== userId) throw new CredentialsError("You can`t delete this book because it not yours!")

        await Book.findByIdAndRemove(bookId)

    })()
}
