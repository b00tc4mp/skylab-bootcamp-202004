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
const { utils: {call} } = require('books-commons')
const context = require('./context')


module.exports = function (bookId) {
    String.validate.notVoid(bookId)

    return (async () => {
        const token = await this.storage.getItem('token')
        const resp =  await call(
            'DELETE',
            `${this.API_URL}/books/delete/${bookId}`,undefined,
            {'Authorization': `Bearer ${token}` })
        
        const { status, body } = resp
        if (status === 204) return
        else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)