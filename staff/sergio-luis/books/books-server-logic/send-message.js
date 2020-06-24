/**
 * Send-message.
 * 
 * @param {string} fromUserId take by token.  
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
require('books-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User, Book, Message } } = require('books-data')

module.exports = (fromUserId, toUserId, bookId, textMessage) => {
 
    String.validate.notVoid(fromUserId)
    String.validate.notVoid(toUserId)
    String.validate.notVoid(bookId)
    String.validate.notVoid(textMessage)

    return (async () => {
        const [user, secondUser, book] = await Promise.all([
            User.findById(fromUserId),
            User.findById(toUserId),
            Book.findById(bookId)
        ])

        if (!user) throw new UnexistenceError(`user with id ${fromUserId} does not exist`);
        if (!secondUser) throw new UnexistenceError(`user with id ${toUserId} does not exist`);
        if (!book) throw new UnexistenceError(`book with id ${bookId} does not exist`);

        const message = await Message.create({ fromUserId, toUserId, bookId, textMessage, date: new Date()});

       await Promise.all([
            User.findByIdAndUpdate(fromUserId, {$addToSet: { sendMessages: message.id }}),
            User.findByIdAndUpdate(toUserId, {$addToSet: {receivedMessages: message.id}})
        ])
     
        return message.id
    })()
}