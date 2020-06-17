/**
 * toggle-following.
 * 
 * @param {string} followingUserId following Id).  
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

module.exports = function (followingUserId) {
    String.validate.notVoid(followingUserId)
   
    return (async () => {
        const token = await this.storage.getItem('token')
        const resp = await call(
            'POST',
            `${this.API_URL}/books/following/toggle`,
            JSON.stringify({followingUserId}),
            { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
   
            const {status,body} = resp
       
           if (status === 200) return
           else {
               const { error } = JSON.parse(body)
   
               throw new Error(error)
           }
    })()
}.bind(context)