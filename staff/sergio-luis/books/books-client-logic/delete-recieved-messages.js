/**
 *  Delete recieved messages.
 *  
 * @param {Object} messageId it is a unic id for a message created when we create a message.  

 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {CredentialsError} You can`t delete this message because it not yours!
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return Don`t return nothing if the book is created.
 *
 */

require('books-commons/polyfills/string')
const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function ( messageId){
    String.validate.notVoid(messageId)

    return (async () => {
        const token = await this.storage.getItem('token')
        const resp =  await call(
            'DELETE',
            `${this.API_URL}/books/messages/delete/${messageId}`,undefined,
            {'Authorization': `Bearer ${token}` })
        
        const { status, body } = resp

        if (status === 204) return
        else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)
