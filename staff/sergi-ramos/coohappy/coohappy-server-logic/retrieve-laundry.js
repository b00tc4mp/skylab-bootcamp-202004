require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')
const { errors: { UnexistenceError } } = require('coohappy-commons')

module.exports = userId => {

    String.validate.notVoid(userId)

    return (async () => {

        const cohousing = await Cohousing.findOne({ members: ObjectId(userId) }, {
            __v: 0, members: 0, author: 0, name: 0, address: 0, accessCode: 0,
            foodList: 0, messages: 0, _id: 0 }).lean()

        if (!cohousing) throw new UnexistenceError(`cohousing of user with id ${userId} does not exist`)

        

        delete cohousing._id
        for(key in cohousing.laundry){
            delete cohousing.laundry[key]._id
            delete cohousing.laundry[key].user
        }

        return cohousing

    })()
}