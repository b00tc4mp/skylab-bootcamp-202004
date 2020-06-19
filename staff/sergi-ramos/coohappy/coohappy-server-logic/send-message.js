require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { models: { Message, Cohousing } } = require('coohappy-data')
const message = require('coohappy-data/models/schemas/message')


module.exports = ((userId, message, date) => {

    String.validate.notVoid(message)
    if(typeof date !== 'object') throw TypeError(`${date} is not an object`)
    String.validate.notVoid(userId)

    return (async () => {
        const cohousing = await Cohousing.findOne({ members: userId })
        if(!cohousing) throw new UnexistenceError(`user with id ${userId} has not a cohousing`)
        const _message = new Message({ userId, message, date })

        cohousing.messages.push(_message)
        await cohousing.save()
    })()
})