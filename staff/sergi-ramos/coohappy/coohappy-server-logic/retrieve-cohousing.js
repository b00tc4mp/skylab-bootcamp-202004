require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { Cohousing } } = require('coohappy-data')

module.exports = cohousingId => {
    String.validate.notVoid(cohousingId)

    return Cohousing.findOne({ _id: ObjectId(cohousingId) }, { __v: 0 }).lean()
        .then(cohousing => {
            if (!cohousing) throw new Error(`cohousing with id ${cohousingId} does not exist`)

            cohousing.id = cohousing._id.toString()

            delete cohousing._id

            return cohousing
        })
}