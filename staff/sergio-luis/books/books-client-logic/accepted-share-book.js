/**
 * Accepted share books.
 * 
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
const { utils:{call} } = require('books-commons')
const context = require('./context')

module.exports = function (newUserId,bookId){
    String.validate.notVoid(newUserId)
    String.validate.notVoid(bookId)
    
    return (async()=>{
        const token = await this.storage.getItem('token')
        const resp = await call(
            'PATCH',
            `${this.API_URL}/books/share/accepted`,
            `{ "newUserId": "${newUserId}", "bookId": "${bookId}" }`,
            { 'Content-type': 'application/json' , 'Authorization': `Bearer ${token}` })

            const {status,body} = resp
            if (status === 200) return 
            else {
                const { error } = JSON.parse(body)
                throw new Error(error)
            } 
    })()
}.bind(context)
