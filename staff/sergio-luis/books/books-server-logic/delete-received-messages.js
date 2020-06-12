/**
 *  Delete recieved messages.
 * 
 * @param {string} userId take by token.  
 * @param {Object} messageId it is a unic id for a message created when we create a message.  

 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {CredentialsError} You can`t delete this message because it not yours!
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return Don`t return nothing if the book is created.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { errors: { UnexistenceError ,CredentialsError} } = require('books-commons')
const { models: { User, Message } } = require('books-data')

module.exports = (userId, messageId) => {
    debugger
    String.validate.notVoid(userId)
    String.validate.notVoid(messageId)

    return (async () => {
        const user = await User.findById(userId)
        const message = await Message.findById(messageId)
        
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
        if (!message) throw new UnexistenceError(`message with id ${messageId} does not exist`)
  
        if(message.toUserId.toString() !== userId)  throw new CredentialsError("You can`t delete this message because it not yours!")
        
        await Message.findByIdAndRemove(messageId)
    })()
}
