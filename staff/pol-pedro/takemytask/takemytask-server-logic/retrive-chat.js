require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { Chat }, mongoose: {ObjectId} } = require('takemytask-data')


module.exports = (chatId) => {

    String.validate.notVoid(chatId)

    return (async () => {

        const chat = await Chat.findOne({ _id: ObjectId(chatId)})
        
        if (!chat) throw new UnexistenceError(`chat with id: ${chatId} dont exists`)

        return chat
        
    })()
}