require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('takemytask-commons')
const { models: { Comments, Chat, User, Worker }, mongoose: {ObjectId} } = require('takemytask-data')


module.exports = (creatorId, destinatorId, message) => {

    String.validate.notVoid(creatorId)
    String.validate.notVoid(destinatorId)
    String.validate.notVoid(message) 

    //TODO CHECK IF THIS TO USERS ALREADY HAVE A CHAT WITH EACH OTHER

    return (async () => {

        const user = await User.findOne({ _id: ObjectId(creatorId) }, {password: 0 })

        if (!user) throw new UnexistenceError(`user with id ${userId} dont exists`)

        const worker = await Worker.findOne({ _id: ObjectId(destinatorId) }, {password: 0 })

        if (!worker) throw new UnexistenceError(`worker with id ${userId} dont exists`)

        const chat = await Chat.create({
            user: ObjectId(creatorId), 
            worker: ObjectId(destinatorId), 
            date: new Date
        })

        chat.messages.unshift( new Comments ({
            userId: ObjectId(creatorId),
            text: message,
            date: new Date
        }))

        user.chat.push(chat._id)

        worker.chat.push(chat._id)

        await chat.save()

        await worker.save()

        await user.save()

    })()
}