require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')
const { errors : { UnexistenceError } } = require('coohappy-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return Cohousing.findOne({ members: ObjectId(userId) }, { __v: 0, members: 0, password: 0, author: 0, name: 0, address: 0, accessCode: 0, foodList: 0 }).lean()
        .then(cohousing => {
            if (!cohousing) throw new Error(`user with id ${userId} does not already has any cohousing`)

            for (key in cohousing.messages) {
                delete cohousing.messages[key]._id
            }
            cohousing.id = cohousing._id.toString()

            delete cohousing._id
            if(cohousing.messages.length === 0) throw new UnexistenceError('no messages yet')
            return cohousing
        })
}