/**
 * Create book.
 * 
 * @param {string} userId take by token.  
 * @param {string} bookId bookId.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {CredentialsError} if you want a share a book and it not yours.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return  no return nothing if success.
 *
 */

require('books-commons/polyfills/string')

const { errors: { UnexistenceError,CredentialsError } } = require('books-commons')
const { models: { User ,Book} } = require('books-data')

module.exports = (userId,bookId) => {

    String.validate.notVoid(userId)    
    String.validate.notVoid(bookId)

    return (async() => {
    const [user, book] =  await Promise.all([
        User.findById(userId),
        Book.findById(bookId)
    ])

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
    if (!book) throw new UnexistenceError(`book with id ${bookId} does not exist`);


      const _book = await Book.findById(bookId)

      if(_book.actualUserId.toString() === userId) throw new CredentialsError("You can't request the book because you are the actual poseidor"); 

      await User.findByIdAndUpdate(userId, {$push: {requestedBooks : bookId }});
    })()
}
