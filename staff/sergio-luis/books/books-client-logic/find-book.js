/**
 * Find books.
 * 
 * @param {string} query query of search book, can search by codebar or name 

 * @throws {UnexistenceError} if don`t find any results.
 * @throws {VoidError} if don`t introduce any query.
 * 
 * @return {Object} Return a array of objects books.
 *
 */

require('books-commons/polyfills/string')
const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function (query) {
    String.validate.notVoid(query)

    return (async () => {
        const resp =  await call(
            'GET',
            `${this.API_URL}/books/find/${query}`,undefined,undefined)
        
        const { status, body } = resp
        
        if (status === 201) {
            const books= JSON.parse(body)
            return books
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)