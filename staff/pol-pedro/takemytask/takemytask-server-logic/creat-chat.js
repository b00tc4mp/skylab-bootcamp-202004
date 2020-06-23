require('takemytask-commons/polyfills/string')
require('takemytask-commons/polyfills/json')
const { errors: { UnexistenceError, DuplicityError } } = require('takemytask-commons')
const { models: { Chat, User, Worker, Comments }, mongoose: {ObjectId} } = require('takemytask-data')


module.exports = (creatorId, destinatorId) => {

    String.validate.notVoid(creatorId)
    String.validate.notVoid(destinatorId)

    //TODO CHECK IF THIS TO USERS ALREADY HAVE A CHAT WITH EACH OTHER

    return (async () => {
        const user = await User.findOne({ _id: ObjectId(creatorId) }, {password: 0 })

        const worker = await Worker.findOne({ _id: ObjectId(destinatorId) }, {password: 0 })
        
        if (!user && !worker) throw new UnexistenceError(`user dont exists`)

        const chat = await Chat.create({
            user: ObjectId(creatorId), 
            worker: ObjectId(destinatorId), 
            date: new Date
        })

        const message = 'hello' + worker.name

        chat.messages.unshift( new Comments ({
            userId: ObjectId(creatorId),
            name: user.name,
            surname: user.surname,
            text: message,
            date: new Date
        }))

        user.chat.push(chat._id)

        worker.chat.push(chat._id)

        await chat.save()

        await worker.save()

        await user.save()

        return chat._id

    })()
}