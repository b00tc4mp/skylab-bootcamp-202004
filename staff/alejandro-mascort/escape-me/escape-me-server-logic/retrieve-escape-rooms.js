require('escape-me-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('escape-me-data')

module.exports = (userId, tag) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(tag)

    return (async () => {
        const user = await User.findById(userId).populate(tag).lean()

        if (!user) throw new Error(`user with id ${userId} does not exist`)

        const escapeRoomList = user[tag].map(({ _id, name, priceMin, priceMax, playersMin, playersMax, genre, city, image }) => ({ id: _id, name, priceMin, priceMax, playersMin, playersMax, genre, city, image }))

        return escapeRoomList
    })()
}