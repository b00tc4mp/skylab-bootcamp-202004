/**
 * Accepted share books.
 * 
 * @param {string} userId take by token.  
 * @param {string} newUserId new actualUserId.  
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

module.exports = (userId,newUserId,bookId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(newUserId)
    String.validate.notVoid(bookId)

    if(userId===newUserId) throw new CredentialsError("you can`t share the book with yourself!"); 

    return (async() => {
    const [actualUser,newUser, book] =  await Promise.all([
        User.findById(userId),
        User.findById(newUserId),
        Book.findById(bookId)
    ])

    if (!actualUser) throw new UnexistenceError(`user with id ${userId} does not exist`);
    if (!newUser) throw new UnexistenceError(`user with id ${newUserId} does not exist`);
    if (!book) throw new UnexistenceError(`book with id ${bookId} does not exist`);


      const _book = await Book.findById(bookId)

      if(_book.actualUserId.toString() !== userId) throw new CredentialsError("The user can`t share the book"); 

      await Promise.all([
        Book.findByIdAndUpdate(bookId, {$set: {actualUserId : newUserId }}),
        User.findByIdAndUpdate(newUserId,{$pull : { requestedBooks : bookId }})
    ])
    })()
}
