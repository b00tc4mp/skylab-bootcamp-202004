require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')
const { errors: {UnexistenceError } } = require('coohappy-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return Cohousing.findOne({ members: ObjectId(userId) }, { __v: 0 })
    .populate('members', 'name surname')
    .lean()


    .populate('messages.userId', 'name surname')
    .lean()
        .then(cohousing => {
            if (!cohousing) throw new UnexistenceError(`cohousing of user with id ${userId} does not exist`)

            cohousing.id = cohousing._id.toString()

            delete cohousing._id

            return cohousing
        })
       
}