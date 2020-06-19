require('escape-me-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { EscapeRoom } } = require('escape-me-data')

module.exports = escapeId => {
    String.validate.notVoid(escapeId)

    return (async () => {
        let escapeRoom = await EscapeRoom.findOne({ _id: ObjectId(escapeId) }, { __v: 0, _id: 0 }).populate('reviews.user').lean()

        if (!escapeRoom) throw new Error(`escape room with id ${escapeId} does not exist`)

        let reviews = escapeRoom['reviews']

        escapeRoom['reviews'] = reviews.map(({ user, comment, rating }) => ({ user: { name: user.name, surname: user.surname, username: user.username }, comment, rating }))


        return escapeRoom
    })()
}