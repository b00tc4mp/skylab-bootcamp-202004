/**
 * Retrieve received message.
 * 
 * @param {string} UserId take by token.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base or if you dont have mensages.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {object} return an array of messages.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User, Message } } = require('books-data')



module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        debugger
        const received = await Message.find({ toUserId: userId })
        .populate('fromUserId', 'name')
        .populate('bookId', 'title image')
        .sort({date:-1})
        .lean()

        debugger
        if(!received.length)throw new UnexistenceError("the user don`t have recieved messages");

         return received
    })()
}