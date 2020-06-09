require('coohappy-commons/polyfills/string')
require('coohappy-commons/polyfills/json')
require('coohappy-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('coohappy-commons')
const { models: { Message } } = require('coohappy-data')




module.exports = ((userId, message, date) => {

    String.validate.notVoid(message)
    if (!date instanceof 'Object') throw new TypeError(`${date} is not a Date`)
    String.validate.notVoid(userId)

    return (async () => {
        const cohousing = await Cohousing.find({ members: userId })
        const message = new Message({ userId, message, date })

        cohousing.messages.push(message)
        await cohousing.save()

    })



})