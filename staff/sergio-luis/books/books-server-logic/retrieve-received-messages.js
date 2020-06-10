/**
 * Create book.
 * 
 * @param {string} UserId take by token.  
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
const { models: { User, Message } } = require('books-data')



module.exports = (userId) => {
    String.validate.notVoid(userId)
debugger
    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        
        if(!user.receivedMessages)throw new UnexistenceError("the user don`t have recived messages");

        const received = await Message.find({ toUserId: userId })
        .populate('fromUserId', 'name')
        .populate('bookId', 'title image')
        .lean()

         return received
    })()
}