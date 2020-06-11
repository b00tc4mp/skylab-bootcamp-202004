require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')
const { errors : { UnexistenceError } } = require('coohappy-commons')

module.exports = userId => {
    String.validate.notVoid(userId)

    return Cohousing.findOne({ members: ObjectId(userId) }, { __v: 0, members: 0, author: 0, name: 0, address: 0, accessCode: 0, messages: 0 })
    .lean()
       
    .then(cohousing => {
            
            if (!cohousing) throw new Error(`user with id ${userId} does not belongs to any cohousing`)

            for (key in cohousing.foodList) {
                delete cohousing.foodList[key]._id
            }
            

            delete cohousing._id
            if(cohousing.foodList.length === 0) throw new UnexistenceError('no list yet')
            return cohousing
        })
}