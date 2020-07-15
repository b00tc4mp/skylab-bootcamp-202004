/**
 * Send-message.
 * 
 * @param {string} toUserId book's Id).  
 * @param {string} bookId book's Id).  
 * @param {string} textMessage text messade url image.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return Don`t return nothing if the message is created.
 *
 */

require('books-commons/polyfills/string')
const {utils:{call}} = require('books-commons');
const context = require('./context')

module.exports = function (toUserId, bookId, textMessage) {
    String.validate.notVoid(toUserId)
    String.validate.notVoid(bookId)
    String.validate.notVoid(textMessage)


    return (async () => {
     const token = await this.storage.getItem('token')
     const resp = await call(
         'POST',
         `${this.API_URL}/books/message/send`,
         JSON.stringify({toUserId,bookId,textMessage}),
         { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })

         const {status,body} = resp
    
        if (status === 200) return
        else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })()
}.bind(context)