require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { models: { Message, Cohousing } } = require('coohappy-data')


module.exports = ((userId, singleMessage, date) => {

    String.validate.notVoid(singleMessage)
    String.validate.notVoid(date)
    String.validate.notVoid(userId)

    return (async () => {
        const cohousing = await Cohousing.findOne({ members: userId })
        if(!cohousing) throw new UnexistenceError(`user with id ${userId} has not a cohousing`)
        const _message = new Message({ userId, message: singleMessage, date })

        cohousing.messages.push(_message)
        await cohousing.save()
    })()
})