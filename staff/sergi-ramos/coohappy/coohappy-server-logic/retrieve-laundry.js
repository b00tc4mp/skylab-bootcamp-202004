require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')
const { errors: { UnexistenceError } } = require('coohappy-commons')

module.exports = userId => {

    String.validate.notVoid(userId)

    return (async () => {

        const cohousing = await Cohousing.findOne({ members: ObjectId(userId) }, { __v: 0 }).lean()
        
                if (!cohousing) throw new UnexistenceError(`cohousing of user with id ${userId} does not exist`)

                cohousing.id = cohousing._id.toString()

                delete cohousing._id

                return cohousing
         
    })()

}