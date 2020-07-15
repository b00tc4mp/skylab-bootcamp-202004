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
const { utils: { call } } = require('books-commons')
const context = require('./context')

module.exports = function (bookId) {
    String.validate.notVoid(bookId)

    return (async() => {
        const resp = await call(
            'GET',
            `${this.API_URL}/books/${bookId}`,undefined,undefined)

            const { status, body } = resp

            if (status === 201) {
                const book = JSON.parse(body)
                return book
            
            }else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            }
    })()
}.bind(context)