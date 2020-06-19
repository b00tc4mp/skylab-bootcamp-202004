require('escape-me-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { EscapeRoom } } = require('escape-me-data')

module.exports = escapeId => {
    String.validate.notVoid(escapeId)

    return (async () => {
        const escapeRoom = await EscapeRoom.findOne({ _id: ObjectId(escapeId) }, { __v: 0, _id: 0 }).lean()

        if (!escapeRoom) throw new Error(`escape room with id ${escapeId} does not exist`)

        delete escapeRoom._id

        return escapeRoom
    })()
}