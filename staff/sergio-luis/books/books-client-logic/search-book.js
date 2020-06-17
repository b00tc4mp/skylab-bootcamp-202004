/**
 * Search book.
 * 
 * @param {string} query query for search books by title.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object}  return an array of books.
 *
 */

const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function(query){
    String.validate.notVoid(query)

    return (async () => {
        const token = await this.storage.getItem('token')
        const resp = await call('GET',`${this.API_URL}/books/search/${query}`,undefined,{ 'Authorization': `Bearer ${token}` });
        const {status,body} = resp

        if (status === 201) {
            return JSON.parse(body)
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })()
}.bind(context)



