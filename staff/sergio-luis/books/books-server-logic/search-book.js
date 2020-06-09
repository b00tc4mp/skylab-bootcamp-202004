/**
 * Create book.
 * 
 * @param {string} userId take by token.  
 * @param {string} query query for search books.  
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

module.exports = (userId, query) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError("This user doesn't exists")

        const books = Book.find({ title: { $regex: `${query}`, $options: 'i' } }, { __v: 0, description: 0, ownerId: 0 }).lean().sort({ title: 1 }).limit(10)
        // const _books = books.map((book)=>{ // problems to eliminated de _id
        //     book.id = book._id
        //     delete book._id
        // })
       
        if (typeof [books] === 'undefined') throw new UnexistenceError("This book doesn't exists")//??????
        debugger
        return await books
    })()
}



