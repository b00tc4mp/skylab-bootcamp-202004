require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { Worker, User, Chat, Comments }, mongoose: {ObjectId} } = require('takemytask-data')


module.exports = (userId, chatId, message) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(chatId)
    String.validate.notVoid(message) 

    return (async () => {

        // test if userId exist in users or worker

        let user

        user = await User.findOne({ _id: ObjectId(userId) }, {password: 0 })

        if (!user){
            user = await Worker.findOne({ _id: ObjectId(userId) }, {password: 0 })
    
            if (!user) throw new UnexistenceError(`user with id ${userId} dont exists`)
        } 

        const chat = await Chat.findOne( {_id: ObjectId(chatId)} )

        if (!chat) throw new UnexistenceError(`chat with id ${chatId} dont exists`)

        chat.messages.unshift( new Comments ({
            userId: ObjectId(userId),
            text: message,
            date: new Date
        }))

        await chat.save()

    })()
}