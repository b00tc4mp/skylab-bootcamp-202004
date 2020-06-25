require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { Chat }, mongoose: {ObjectId} } = require('takemytask-data')

/**
 * restrive chat object
 * @param {string} userId user or worker unique id
 * @returns {object}
 *
 * @throws {Error} if server throws errror
 */


module.exports = (chatId) => {

    String.validate.notVoid(chatId)

    return (async () => {

        const chat = await Chat.findOne({ _id: ObjectId(chatId)})
        
        if (!chat) throw new UnexistenceError(`chat with id: ${chatId} dont exists`)

        return chat
        
    })()
}