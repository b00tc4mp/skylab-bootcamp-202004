/**
 * Calculate Distance Book.
 * 
 * @param {string} newUserId new actualUserId.  
 * @param {string} bookId bookId.  
 *
 * @throws {UnexistenceError} if don`t find userId or the latitude/longitude in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return  no return nothing if success.
 *
 */


require('books-commons/polyfills/string')
const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function(secondUserId, bookId) {
    String.validate.notVoid(secondUserId)
    String.validate.notVoid(bookId)

    return (async() => {
        const token = await this.storage.getItem('token')
        const resp = await call(
            'POST',
            `${this.API_URL}/books/add/distance`,
            JSON.stringify({secondUserId,bookId}), { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` })

        const { status, body } = resp
        
        if (status === 201) return
        else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)